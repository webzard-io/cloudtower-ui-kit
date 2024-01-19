import listSelectors from "list-selectors";
import path from "path";
import { calculate } from "specificity";
import { Antd5PrefixCls } from "../../src/utils/constants";

/**
 * Start at 0,
 * add 100 for each ID value,
 * add 10 for each class value (or pseudo-class or attribute selector),
 * add 1 for each element selector or pseudo-element.
 */
const SCORE = {
  A: 100,
  B: 10,
  C: 1,
};

describe.skip("css selectos score should not greater than 12", () => {
  const componentStyle = path.resolve(__dirname, "../../dist/components.css");
  const antdStyle = path.resolve(__dirname, "../../src/styles/libs/antd.css");
  const antdSelectors: Set<string> = new Set();

  beforeAll(async () => {
    const regex =
      /\[(class\^|draggable|ant-click-animating-without-extra-node|ant-click-animating|role|type)='([^']+)'\]/g;
    const regex2 = /\[(tabindex|fill|colspan)='([^']+)'\]/g;
    const regex3 = /\[(class\*)=\s(ant-)]/g;
    const regex4 = /\[(class\*)='(\S+)'\]/g;
    const regex5 = /\[(class\*)='([^']+)'\]/g;

    await new Promise((resolve) => {
      listSelectors(antdStyle, ({ selectors }) => {
        (selectors as string[]).forEach((sel) => {
          antdSelectors.add(
            sel
              .replace(regex, "[$1=$2]")
              .replace(regex2, '[$1="$2"]')
              .replace(regex3, "[$1=$2]")
              .replace(regex4, "[$1=$2]")
              .replace(regex5, '[$1="$2"]'),
          );
        });
        resolve(true);
      });
    });
  });

  /**
   * we should not pass those not eagle class name and high score class name
   */
  it("pure eagle style score should below 13", async () => {
    const notEagleStyleCls: Record<number, string[]> = {};
    const highScoreEagleStyleCls: Record<number, string[]> = {};
    await new Promise((resolve) => {
      listSelectors(
        componentStyle, // source
        function ({ selectors }) {
          // callback
          for (const sel of selectors) {
            if (antdSelectors.has(sel)) {
              continue;
            }
            if (sel.includes(Antd5PrefixCls)) {
              continue;
            }
            const spec = calculate(sel);
            const { A, B, C } = spec;
            const score = SCORE.A * A + SCORE.B * B + SCORE.C * C;
            // const scoreCollection = scores[score] || [];
            // scores[score] = scoreCollection.concat([sel]);
            const noEagleStyle = notEagleStyleCls[score] || [];
            if (score >= 10 && !sel.includes(".E_")) {
              notEagleStyleCls[score] = noEagleStyle.concat([sel]);
            }

            const highScoreStyle = highScoreEagleStyleCls[score] || [];
            if (score > 12 && sel.startsWith(".E_")) {
              highScoreEagleStyleCls[score] = highScoreStyle.concat([sel]);
            }
          }
          resolve(true);
        },
      );
    });

    expect(notEagleStyleCls).toMatchSnapshot("not eagle class name");
    expect(highScoreEagleStyleCls).toMatchSnapshot("danger eagle class name");
  });
});
