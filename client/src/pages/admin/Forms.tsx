import React from "react";
import CustomFieldForm from "../../components/admin/Form/CustomFieldForm";
import CustomFieldManager from "../../components/admin/Form/CustomFieldManager";

const Forms:React.FC = () => {
  return (
    <>
      <h1>Custom Field Management</h1>
      <CustomFieldForm />
      <CustomFieldManager />
    </>
  );
};

export default Forms;
