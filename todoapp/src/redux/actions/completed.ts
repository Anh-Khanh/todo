interface itodoapp {
  id: number;
  title: string;
  status: string;
}
export const completed = (data: itodoapp) => {
  return {
    type: "COMPLETED",
    payload: data,
  };
};
