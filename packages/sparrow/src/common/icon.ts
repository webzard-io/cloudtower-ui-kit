export function getOSIcon(os: string | null, vmtoolsReady = true) {
  let clazz = "";
  const name = (os || "").split(" ").join("").toLowerCase();
  if (name.includes("redhat")) {
    clazz = "redhat";
  } else if (name.includes("debian")) {
    clazz = "debian";
  } else if (name.includes("centos")) {
    clazz = "centos";
  } else if (name.includes("ubuntu")) {
    clazz = "ubuntu";
  } else if (name.includes("archlinux")) {
    clazz = "archlinux";
  } else if (name.includes("fedora")) {
    clazz = "fedora";
  } else if (name.includes("suse")) {
    clazz = "opensuse";
  } else if (name.includes("oraclelinux")) {
    clazz = "oraclelinux";
  } else if (name.includes("oraclesolaris")) {
    clazz = "oraclesolaris";
  } else if (name.includes("macos") || name.includes("osx")) {
    clazz = "macOS";
  } else if (name.includes("windows2000")) {
    clazz = "windows2000";
  } else if (name.includes("windowsxp") || name.includes("windowsserver2003")) {
    clazz = "windowsXP";
  } else if (
    name.includes("windows7") ||
    name.includes("windowsvista") ||
    name.includes("windowsserver2008")
  ) {
    clazz = "windows7";
  } else if (name.includes("windows8")) {
    clazz = "windows8";
  } else if (name.includes("windows10")) {
    clazz = "windows10";
  } else if (
    name.includes("windowsserver2012") ||
    name.includes("windowsserver2016") ||
    name.includes("windowsserver2019") ||
    name.includes("windows2012server") ||
    name.includes("windows2008server")
  ) {
    clazz = "windows-server";
  } else if (name.includes("neokylin")) {
    clazz = "neoKylin";
  } else if (name.startsWith("kylin")) {
    clazz = "kylin";
  } else if (name.includes("uniontech") || name.includes("uos")) {
    clazz = "uniontech";
  } else if (!vmtoolsReady) {
    clazz = "question";
  } else {
    clazz = "unknown";
  }
  return `os-logo-${clazz}`;
}

export function getAlertIcon(
  type: "success" | "info" | "warning" | "error" | "normal" | undefined
) {
  switch (type) {
    case "success":
      return "1-checkmark-done-success-circle-fill-16-green";
    case "info":
      return "1-info-i-circle-fill-16-blue";
    case "warning":
      return "1-notice-attention-16-yellow";
    case "error":
      return "1-xmark-failed-serious-warning-fill-16-red";
    case "normal":
      return "1-info-i-circle-fill-16-secondary";
    default:
      return "1-info-i-circle-fill-16-secondary";
  }
}
