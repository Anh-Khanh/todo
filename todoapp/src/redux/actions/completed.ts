interface itodoapp {
  name?: string;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
  updatedAt?: string;
  id: number;
  title?: string;
  status: string;
}
export const completed = (data: itodoapp) => {
  return {
    type: "COMPLETED",
    payload: data,
  };
};
