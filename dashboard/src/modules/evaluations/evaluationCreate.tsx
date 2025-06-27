import { Create, DateTimeInput, NumberInput, SimpleForm, TextInput, required } from "react-admin";

export const EvaluationCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="projectId" validate={[required()]} />
      <TextInput source="systemId" validate={[required()]} />
      <TextInput source="datasetId" validate={[required()]} />
      <NumberInput source="score" validate={[required()]} />
      <NumberInput source="accuracy" />
      <NumberInput source="helpfulness" />
      <NumberInput source="relevancy" />
      <NumberInput source="toxicity" />
      <DateTimeInput source="date" validate={[required()]} />
    </SimpleForm>
  </Create>
);
