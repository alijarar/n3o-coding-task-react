type TObject = Record<string, number, string, undefined, boolean, TFunction>;
type TFunction = () => void;
type TArrayOfObjects = TObject[];


interface ITable {
    columns: TArrayOfObjects;
    loading?: boolean;
    dataSource: TArrayOfObjects;
    rowKey?: TNumberOrString | any;
    pagination?: boolean;
    onChange?:TObject
}
  
interface FormData {
    name: string;
    location: string;
    theme: string;
    price?: number;
  }
  
  interface ILocation {
    id: string;
    name: string;
  }
  interface ITheme {
    id: string;
    name: string;
  }