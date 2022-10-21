import {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  KeyboardEvent,
  FocusEvent,
} from "react";
import {useSelector} from "react-redux"
import todoappApi from "./api/todoappApi";
import './App.css';
import Task from './components/Tasks';

function App() {
  interface itodoapp {
    name: string,
    categoryId: string,
    startDate: string,
    endDate: string,
    createdAt: string,
    updatedAt: string,
    id?: number,
    title: string,
    status: string,
  }
  const [completed, setCompleted] = useState<itodoapp[]>([]);
  const [notcompleted, setNotcompleted] = useState<itodoapp[]>([]);
  const [arrtodo, setArrtodo] = useState<itodoapp[]>([]);
  const refAdd = useRef<HTMLInputElement>(null);
// KeyboardEvent
  function handleEventkey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.keyCode === 13) {
      const count = Math.ceil(Date.now() * Math.random());
      console.log(count);
      
      const data: itodoapp = {
        title: refAdd.current?.value || "",
        status: "completed",
        name: "anh",
        categoryId: "khanh",
        startDate: "10/20/2022",
        endDate: "10/20/2022",
        createdAt: "10/20/2022",
        updatedAt: "10/20/2022",
        id: count,
      };
      todoappApi.add(data);
      setCompleted((prev) => [data, ...prev]);
      refAdd.current && (refAdd.current.value = "");
    // }
    }
  } 
  const completeds:[itodoapp]= useSelector((data:any)=>{
    return data.completedReducer});

    useEffect(()=>{
         (async () => {
           const data = await todoappApi.getAll();
           const arr1: [] = data.filter(
             (value: itodoapp) => value.status === "completed"
           );
           const arr2: [] = data.filter(
             (value: itodoapp) => value.status === "not_started"
           );
           setNotcompleted([...arr2]);
           setCompleted([...arr1]);
           setArrtodo([...arr1, ...arr2]);
         })();
    },[])

  useLayoutEffect(() => {
    if (completeds.length > 0 && completeds[0].status === "completed" ) {
      const arr = completed.filter(
        (value: itodoapp) => value.id !== completeds[0].id)
      setCompleted([...arr]);
      completeds[0].status = "not_started";
      setNotcompleted((prev) => [...prev, ...completeds]);
       const id = completeds[0].id;
       todoappApi.update({ id: id, status: "not_started" });
    }
    else  if (completeds.length > 0 && completeds[0].status === "not_started") {
      const arr = notcompleted.filter(
        (value: itodoapp) => value.id !== completeds[0].id
      );
      setNotcompleted([...arr]);
      completeds[0].status = "completed";
      const id = completeds[0].id
      todoappApi.update({id:id, status: "completed" });
      setCompleted((prev) => [...prev, ...completeds]);
    }
  }, [completeds]);
  // xoa
  function handleDelete(e: React.MouseEvent<HTMLElement>) {
    const id = (e.target as HTMLElement).dataset.del;
    const arr1 = completed.filter((value: itodoapp) => String(value.id) !== id);
    setCompleted([...arr1]);
    const arr2 = notcompleted.filter(
      (value: itodoapp) => String(value.id) !== id
    );
    setNotcompleted([...arr2]);
    todoappApi.remove(id as string);
  }
  function handleBlur(e: FocusEvent<HTMLInputElement>) {
    const id = e.target.dataset.id;
    todoappApi.update({ id: Number(id), title: e.target.value });
  }

  function handleEnter(e: KeyboardEvent<HTMLInputElement>){
    if (e.keyCode === 13) {
    const id = (e.target as HTMLInputElement).dataset.id;
    todoappApi.update({ id: Number(id), title: (e.target as HTMLInputElement).value });
     (e.target as HTMLInputElement).blur();
    }
  }
  return (
    <div className="bg-[#F5F5F5] min-h-[100vh]">
      <h1 className="text-center font-bold text-[28px] text-[#0C75F1] leading-[100px]">
        TO DO APP
      </h1>
      <div className="w-[861px] mx-auto">
        <div className="mb-[40px]">
          <Task
            placeholder="Add to do"
            refs={refAdd}
            handleEvent={handleEventkey}
          />
        </div>
        {completed.map((value: itodoapp) => {
          return (
            <Task
              key={value.id }
              check={false}
              value={value.title}
              ids={value.id}
              status={value.status}
              handleDelete={handleDelete}
              handleBlur={handleBlur}
              handleEvent={handleEnter}
            />
          );
        })}
      </div>
      <div className="w-[861px] mx-auto ">
        <h2 className="my-8 font-bold">Completed</h2>
        {notcompleted.length > 0 &&
          notcompleted.map((value: itodoapp) => {
            return (
              <Task
                key={value.id}
                value={value.title}
                check={true}
                ids={value.id}
                status={value.status}
                handleDelete={handleDelete}
                handleBlur={handleBlur}
                handleEvent={handleEnter}
              />
            );
          })}
      </div>
    </div>
  );
}

export default App;
