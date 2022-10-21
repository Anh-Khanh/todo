import { BsCheckCircle } from "react-icons/bs";
import { IoMdRadioButtonOff } from "react-icons/io";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { completed } from "../../redux/actions/completed";
import { RefObject, FocusEvent, KeyboardEvent } from "react";

type Props = {
  placeholder?: string;
  value?: string;
  ids?: number;
  status?: string;
  check?: boolean;
  refs?: RefObject<HTMLInputElement>;
  handleEvent?: (e: KeyboardEvent<HTMLInputElement>)=>void;
  handleDelete?: (event: React.MouseEvent<HTMLElement>) => void;
  handleBlur?: (e: FocusEvent<HTMLInputElement>) =>void;
};

function Task(props: Props) {
  const dispatch = useDispatch();

  function handleClick(e: any) {
    // const {target} = e
      dispatch(
        completed({
          id: parseInt(e.target.dataset.id),
          status: e.target.dataset.status,
          title: e.target.dataset.value,
        })
      );
  }

  return (
    <div className="px-[20px] h-[48px]  flex items-center shadow-lg justify-between bg-white my-[10px] ">
      <p className="flex items-center w-[100%]">
        {props.check ? (
          <BsCheckCircle
            className="text-[20px] mr-[10px] text-green-600 cursor-pointer p-[2px]"
            data-id={props.ids}
            data-status={props.status}
            data-value={props.value}
            onClick={handleClick}
          />
        ) : (
          <IoMdRadioButtonOff
            className="text-[20px] mr-[10px] cursor-pointer p-[2px]"
            data-id={props.ids}
            data-status={props.status}
            data-value={props.value}
            onClick={handleClick}
          />
        )}
        <input
          placeholder={props.placeholder}
          className="w-[80%] outline-none text-[#2564CF]"
          defaultValue={props.value}
          ref={props.refs}
          data-id={props.ids}
          onKeyDown={props.handleEvent}
          onBlur={props.handleBlur}
        ></input>
      </p>
      <p
        className="text-end text-red-700 cursor-pointer"
        data-del={props.ids}
        onClick={props.handleDelete}
      >
        <AiFillDelete className="pointer-events-none" />
      </p>
    </div>
  );
}

export default Task;
