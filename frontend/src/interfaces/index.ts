export interface AppContextInterface {
  login?: {
    logged: boolean;
    id: number;
    username: string;
  };
  setLogin?: React.Dispatch<
    React.SetStateAction<{
      logged: boolean;
      id: number;
      username: string;
    }>
  >;
}
