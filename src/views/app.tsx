import React from "react";
import { ItemSoduku, Sudoku } from "../functions/sudoku";
import { Config } from "./config";
import { Display } from "./display";
import Confetti from "react-confetti";
import Logo from "../assets/logo2.svg";
import { ShowKeyboard, Keyboard } from "./keyboard";

function finalized(table: ItemSoduku[][]) {
  let count = 0;
  for (const column of table) {
    for (const row of column) {
      if (row.value !== row.accept) {
        count++;
      }
    }
  }
  return count === 0;
}

function changeTableFromKeyBoard(
  setAttempt: React.Dispatch<React.SetStateAction<number>>,
  setTable: React.Dispatch<React.SetStateAction<ItemSoduku[][]>>,
  table: ItemSoduku[][],
  attempt: number,
  itr: number,
  itd: number
) {
  return (value: number) => {
    const ntable = [...table];
    setAttempt(attempt + 1);
    ntable[itr][itd] = {
      ...ntable[itr][itd],
      value,
      iserror: ntable[itr][itd].accept !== value,
    };
    setTable(ntable);
  };
}

export const App: React.FunctionComponent<unknown> = (props) => {
  const sudoku = new Sudoku();
  const [table, setTable] = React.useState<ItemSoduku[][]>([]);
  const [attempt, setAttempt] = React.useState(0);
  const [timer, setTimer] = React.useState(0);
  const [start, setStart] = React.useState(false);
  const [config, setConfig] = React.useState(0);
  const [interv, setInterv] = React.useState(0);
  const [end, setEnd] = React.useState(false);
  const [rstrcount, setRstrcount] = React.useState(0);
  const [editable, setEditable] = React.useState(true);
  const [keyboard, setKeyboard] = React.useState<ShowKeyboard | null>(null);

  React.useEffect(() => {
    setEditable(window.innerWidth > 999);
  }, []);

  React.useEffect(() => {
    setTable(sudoku.generateSudoku([30, 50, 80][config]));
  }, [config]);

  React.useEffect(() => {
    if (start && timer === 0) {
      setInterv(
        setInterval(() => {
          setTimer((timer) => timer + 1);
        }, 1000)
      );
    }
  }, [start]);

  React.useEffect(() => {
    if (finalized(table) && start) {
      clearInterval(interv);
      setEnd(true);
      if (rstrcount === 10) {
        window.location.reload();
      }
      if (rstrcount === 0) {
        setInterval(() => {
          setRstrcount((rstrcount) => rstrcount + 1);
        }, 1000);
      }
    }
  }, [table, rstrcount]);

  return (
    <>
      <div className="app">
        <img className="logo" src={Logo} alt="logo" />

        {!editable && keyboard && (
          <Keyboard
            setKeyboard={setKeyboard}
            changeTableFromKeyBoard={changeTableFromKeyBoard(
              setAttempt,
              setTable,
              table,
              attempt,
              keyboard.itr,
              keyboard.itd,
            )}
          />
        )}

        {end && (
          <div className="full-page">
            <Confetti width={1000} height={1000} />
          </div>
        )}

        <div className="wrapp">
          {!start && (
            <Config config={config} setConfig={setConfig} setStart={setStart} />
          )}
          {start && (
            <Display
              attempt={attempt}
              timer={timer}
              table={table}
              setAttempt={setAttempt}
              setTable={setTable}
              end={end}
              rstrcount={rstrcount}
              editable={editable}
              setKeyboard={setKeyboard}
            />
          )}
        </div>
        <footer>rbm91 &copy; 2023</footer>
      </div>
    </>
  );
};
