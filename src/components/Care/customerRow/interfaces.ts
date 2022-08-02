import { CustomerTypes } from "../../../state";

export type Props = {
  customer: Partial<CustomerTypes.Customer>;
  isEdit?: boolean;
  type?: "create" | "edit";
  whithAction?: boolean;
  noId?: boolean;
  newCustomerState?:
    | [
        Partial<CustomerTypes.Customer>,
        React.Dispatch<Partial<CustomerTypes.Customer>>
      ]
    | undefined;
};
