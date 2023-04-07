import React from "react";
import moment from "moment";
import { ItemSoduku } from "../functions/sudoku";

interface Props {
  attempt: number;
  timer: number;
  table: ItemSoduku[][];
  setAttempt: React.Dispatch<React.SetStateAction<number>>;
  setTable: React.Dispatch<React.SetStateAction<ItemSoduku[][]>>;
  end: boolean;
  rstrcount: number;
}

function countErrors(table: ItemSoduku[][]): number {
  let count = 0;
  for (const column of table) {
    for (const row of column) {
      if (row.iserror) {
        count++;
      }
    }
  }
  return count;
}

function countMovement(table: ItemSoduku[][]): number {
  let count = 0;
  for (const column of table) {
    for (const row of column) {
      if (row.static) {
        count++;
      }
    }
  }
  return count;
}

function changeTable(
  event: React.KeyboardEvent<HTMLDivElement>,
  table: ItemSoduku[][],
  attempt: number,
  setAttempt: React.Dispatch<React.SetStateAction<number>>,
  setTable: React.Dispatch<React.SetStateAction<ItemSoduku[][]>>,
  itr: number,
  itd: number
) {
  const ntable = [...table];
  const value = parseInt(event.key, 10);

  if (event.key !== "Backspace") {
    setAttempt(attempt + 1);
  }

  if ((!Number.isNaN(value) && value > 0) || event.key === "Backspace") {
    ntable[itr][itd] = {
      ...ntable[itr][itd],
      value: event.key !== "Backspace" ? value : 0,
      iserror: Number.isNaN(value) ? false : ntable[itr][itd].accept !== value,
    };
    setTable(ntable);
  } else {
    event.preventDefault();
  }
}

export const Display: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="topper">
        <div>
          <label>
            Movements:&nbsp;&nbsp;{props.attempt}/{countMovement(props.table)}
          </label>
        </div>
        <div>
          <label>
            {moment()
              .startOf("day")
              .add(props.timer, "seconds")
              .format("HH:mm:ss")}
          </label>
        </div>
        <div>
          <label>Errors:&nbsp;&nbsp;{countErrors(props.table)}</label>
        </div>
      </div>
      <table>
        <tbody>
          {props.table.map((row, itr) => (
            <tr key={`ts-${itr}`}>
              {row.map((item, itd) => (
                <td
                  key={`td-${itd}`}
                  className={`${item.static && "empty"} ${
                    item.value !== 0 && item.iserror && "error"
                  }`}
                >
                  <div
                    contentEditable={item.static && !props.end}
                    suppressContentEditableWarning={true}
                    onKeyDown={(event) =>
                      changeTable(
                        event,
                        props.table,
                        props.attempt,
                        props.setAttempt,
                        props.setTable,
                        itr,
                        itd
                      )
                    }
                    onKeyUp={(event) => {
                      if (event.currentTarget.innerText.length > 1) {
                        event.currentTarget.innerText =
                          event.currentTarget.innerText.slice(0, 1);
                      }
                    }}
                  >
                    {!item.static ? item.value : ""}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/">
        <button className="btn-restart">
          {props.end ? `ReStart in ${props.rstrcount}/10` : "ReStart"}
        </button>
      </a>
    </>
  );
};
