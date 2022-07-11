import { forwardRef } from "react";
import { Form, FlexboxGrid, Input } from "rsuite";


const SixFields = forwardRef((props: any, ref: any) => {
  const { name0, name1, name2, name3, name4, name5, ...rest } = props;
  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={4} style={{ paddingLeft: "5px" }}>
        <Input name={name0} {...rest} ref={ref} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4} style={{ paddingLeft: "5px" }}>
        <Input name={name1} {...rest} ref={ref} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4} style={{ paddingLeft: "5px" }}>
        <Input name={name2} {...rest} ref={ref} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4} style={{ paddingLeft: "5px" }}>
        <Input name={name3} {...rest} ref={ref} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4} style={{ paddingLeft: "5px" }}>
        <Input name={name4} {...rest} ref={ref} />
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={4} style={{ paddingLeft: "5px" }}>
        <Input name={name5} {...rest} ref={ref} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
});
SixFields.displayName = "SixField";

export default function SixDigitField(props:any) {
  const { name, label, accepter, ...rest } = props;
  return (
    <Form.Group controlId={`${name}`}>
      <Form.ControlLabel>{label}</Form.ControlLabel>
      <Form.Control style={{width:"100%"}} name={name} accepter={SixFields} {...rest} />
    </Form.Group>
  );
}