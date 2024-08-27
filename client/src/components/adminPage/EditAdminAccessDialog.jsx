import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import showToastMessage from "../toast/Toast";
import axios from "axios";
import AdminContext from "../../context/AdminContext";

const EditAdminAccessDialog = ({ admin ,setAdmin, isOpen, setIsOpen }) => {
  const [selectedRoles, setSelectedRoles] = useState([]);
  const {token} = useContext(AdminContext)

  // Initialize selectedRoles based on admin.roles when component mounts
  useEffect(() => {
    if (admin?.roles) {
        console.log("jj");
        
      setSelectedRoles(admin.roles);
    }
  }, [admin?.roles]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedRoles([...selectedRoles, value]);
    } else {
      setSelectedRoles(selectedRoles.filter((option) => option !== value));
    }
  };

  const submit = async () => {
    // /api/admin/changeAccessablity/:id
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      };
      const { data } = await axios.put(
        `http://localhost:4000/api/admin/changeAccessablity/${admin._id}`,
        {
          roles:selectedRoles
        },
        config
      );
      console.log(data.data);
      let temp = admin;
      temp.roles=selectedRoles;
      setAdmin(temp);

      showToastMessage(
        "success",
        `Admin ${data.data.name}'s accessiblity changed !`
      );
    setIsOpen(false);
  }catch(error){
    showToastMessage("error",error)
  }
}

  const isChecked = (role) => selectedRoles.includes(role);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black bg-opacity-50">
          <DialogPanel className="w-1/3 mr-[270px] space-y-4 border bg-white p-12">
            <DialogTitle className="text-lg font-bold text-center text-blue-600">
              Change Accessibility for {admin?.name}
            </DialogTitle>

            {/* Admin roles checkbox */}
            <div>
              {["accountActivation", "withdrawRequest", "profitUpdate", "updateDiposite", "ComissionDistribution"].map((role) => (
                <div key={role} className="flex gap-3">
                  <input
                    type="checkbox"
                    value={role}
                    onChange={handleCheckboxChange}
                    checked={isChecked(role)}
                  />
                  <label className="font-bold text-sm py-1 text-blue-600">
                    {role.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                className="bg-red-500 text-white font-semibold rounded-md px-2 py-1"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white font-semibold rounded-md px-2 py-1"
                onClick={submit}
              >
                Update Accessablity
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default EditAdminAccessDialog;
