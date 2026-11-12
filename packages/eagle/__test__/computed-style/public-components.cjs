const path = require("node:path");
const ts = require("typescript");

module.exports = function publicComponents() {
  const eagle = path.resolve(__dirname, "../..");
  const entry = path.join(eagle, "src/index.ts");
  const config = ts.getParsedCommandLineOfConfigFile(
    path.join(eagle, "tsconfig.json"),
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic(d) {
        throw new Error(d.messageText);
      },
    }
  );
  const program = ts.createProgram([entry], config.options);
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(entry);

  function returnsElement(type) {
    if (type.isUnionOrIntersection()) return type.types.some(returnsElement);
    const symbol = type.getSymbol();
    return (
      symbol?.name === "ReactElement" ||
      (symbol?.name === "Element" &&
        Boolean(type.getProperty("props") && type.getProperty("key")))
    );
  }

  function isComponent(type) {
    if (type.isUnion()) return type.types.some(isComponent);
    return (
      type
        .getCallSignatures()
        .some(
          (signature) =>
            returnsElement(signature.getReturnType()) ||
            Boolean(signature.getReturnType().flags & ts.TypeFlags.Null)
        ) ||
      type
        .getConstructSignatures()
        .some((signature) => signature.getReturnType().getProperty("render"))
    );
  }

  function namesFor(symbol, prefix = "", ancestors = []) {
    if (!/^[A-Z]/.test(symbol.name)) return [];
    const target =
      symbol.flags & ts.SymbolFlags.Alias
        ? checker.getAliasedSymbol(symbol)
        : symbol;
    if (!(target.flags & ts.SymbolFlags.Value)) return [];
    const type = checker.getTypeOfSymbolAtLocation(
      target,
      target.valueDeclaration || source
    );
    if (ancestors.includes(type)) return [];
    const name = prefix + symbol.name;
    return [
      ...(isComponent(type) ? [name] : []),
      ...type
        .getProperties()
        .flatMap((child) => namesFor(child, name + ".", [...ancestors, type])),
    ];
  }

  return checker
    .getExportsOfModule(checker.getSymbolAtLocation(source))
    .flatMap((symbol) => namesFor(symbol))
    .sort();
};
