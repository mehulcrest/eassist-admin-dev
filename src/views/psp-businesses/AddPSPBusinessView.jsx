import AddPSPProfileForm from "../../components/AddPSPTabs/AddPSPProfileForm";
import { useNavigate } from "react-router-dom";

const AddPSPBusinessView = () => {
  const navigate = useNavigate();

  const handleCreateBusinessProfile = () => {
    // Keep business submit flow isolated for business API integration.
    navigate("/psp-businesses");
  };

  return (
    <AddPSPProfileForm
      pspType="business"
      cancelPath="/psp-businesses"
      finalButtonLabel="Create PSP Business Profile"
      onFinalSubmit={handleCreateBusinessProfile}
    />
  );
};

export default AddPSPBusinessView;
