import React from "react";

export interface ShowKeyboard {
  itr: number;
  itd: number;
}

interface Props {
  setKeyboard: React.Dispatch<React.SetStateAction<ShowKeyboard | null>>;
  changeTableFromKeyBoard: (_: number) => void;
}

export const Keyboard: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <div className="modal is-active">
        <div className="modal-background"></div>
        <div className="modal-content">
          <table>
            <tbody>
              {[0, 3, 6].map((column) => (
                <tr key={`tr-kb-${column}`}>
                  {[1, 2, 3].map((item) => (
                    <td
                      key={`tb-kb-${column}-${item}`}
                      className="btn-keyboar"
                      onClick={() => {
                        props.setKeyboard(null);
                        props.changeTableFromKeyBoard(column + item);
                      }}
                    >
                      {column + item}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={() => props.setKeyboard(null)}
        ></button>
      </div>
    </>
  );
};
