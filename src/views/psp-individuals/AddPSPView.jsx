import AddPSPProfileForm from "../../components/AddPSPTabs/AddPSPProfileForm";
import { useNavigate } from "react-router-dom";

const AddPSPView = () => {
  const navigate = useNavigate();

  const handleCreateIndividualProfile = () => {
    // Keep individual submit flow isolated for individual API integration.
    navigate("/psp-individuals");
  };

  return (
    <AddPSPProfileForm
      pspType="individual"
      cancelPath="/psp-individuals"
      finalButtonLabel="Create PSP Individual Profile"
      onFinalSubmit={handleCreateIndividualProfile}
    />
  );
};

export default AddPSPView;
