import { Form, Input, Select, Button, Typography } from "antd";

const { Option } = Select;

interface IDropdownData {
  locations?: ILocation[]
  themes?:ITheme[]
  submitDonation?:TObject
  donations?:TObject

}

export const DonationForm: React.FC<IDropdownData> = ({
  locations = [],
  themes = [],
  submitDonation,
  donations
}) => {
  const [form] = Form.useForm();
  const { Title } = Typography;
  const onFinish = (values: FormData) => {
    const { price, ...restValues } = values;
    const currencyCode = price ? "GBP" : "";
    const formattedPrice = price ? { currencyCode, amount: price } : null;

    const submissionData = {
      ...restValues,
      price: formattedPrice,
    };
    submitDonation(submissionData)
    form.resetFields();
  };
  const validateUniqueName = (_: any, value: string) => {
    let isUniqueName = false
    donations.map((item: TObject) => {
      if (item.name === value) {
        isUniqueName=true
      }
    })
    if (isUniqueName) {
      return Promise.reject("Name must be unique");
    }
    
    return Promise.resolve();
  }
  return (
    <div className="form-container">
      <Title>Donation Form</Title>
      <Form<FormData> form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Name"
        name="name"
        rules={[
          { required: true, message: "Please enter a name" },
          {
            min: 1,
            max: 200,
            message: "Name should be between 1 and 200 characters",
          },
          {validator:validateUniqueName}
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Locations"
        name="location"
        rules={[{ required: true, message: "Please select a location" }]}
      >
        <Select>
          {locations.map((location: ILocation) => (
            <Option key={location.id} value={location.id}>
              {location.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Themes"
        name="theme"
        rules={[{ required: true, message: "Please select a theme" }]}
      >
        <Select>
          {themes.map((theme: ITheme) => (
            <Option key={theme.id} value={theme.id}>
              {theme.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[
          { required: true, message: "Please enter a price" },
          {
            validator: (_, value) =>
              value && value > 0
                ? Promise.resolve()
                : Promise.reject("Price must be greater than 0"),
          },
        ]}
      >
        <Input type="number" step="any" prefix="£/GBP" min={0} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
    
  );
};
