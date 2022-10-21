interface itodoapp {
  id: number;
  title: string;
  status: string;
}
const completedReducer = (
  state: itodoapp[] = [],
  action: { type: string; payload: itodoapp }
) => {
  switch (action.type) {
    case "COMPLETED":
      return [
        {
          id: action.payload.id,
          status: action.payload.status,
          title: action.payload.title
        },
      ];
    default:
      return state;
  }
};

export default completedReducer;
