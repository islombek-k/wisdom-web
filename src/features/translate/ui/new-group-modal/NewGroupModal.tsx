import { Input, Modal } from "@/shared/ui";
import { useState } from "react";

interface newGroupModalProps {
  isnewGroupModalOpen: boolean;
  setIsnewGroupModalOpen: (value: boolean) => void;
}

const NewGroupModal = ({
  isnewGroupModalOpen,
  setIsnewGroupModalOpen,
}: newGroupModalProps) => {
  const [groupName, setGroupName] = useState("");
  return (
    <Modal
      isOpen={isnewGroupModalOpen}
      onClose={() => setIsnewGroupModalOpen(false)}
      title="Create a new group"
      description="All vocabularies in one group, get an access quickly."
      primaryBtnText="Create a group"
      isPrimaryBtnDisabled={!groupName}
    >
      <Input
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="bg-gray-100 mb-8"
        placeholder="Enter a group name"
      />
    </Modal>
  );
};

export default NewGroupModal;
