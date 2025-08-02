import { Input, Modal } from "@/shared/ui";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { wordbankApi } from "@/features/wordbank/api/wordbankApi";
import { toast } from "react-toastify";

interface newGroupModalProps {
  isnewGroupModalOpen: boolean;
  setIsnewGroupModalOpen: (value: boolean) => void;
  setIsBookmarkModalOpen: (value: boolean) => void;
}

const NewGroupModal = ({
  isnewGroupModalOpen,
  setIsnewGroupModalOpen,
  setIsBookmarkModalOpen,
}: newGroupModalProps) => {
  const [groupName, setGroupName] = useState("");
  const queryClient = useQueryClient();

  const createFolderMutation = useMutation({
    mutationFn: wordbankApi.createFolder,
    onSuccess: () => {
      toast.success("Group created successfully!");
      queryClient.invalidateQueries({ queryKey: ["wordbank"] });
      setGroupName("");
      setIsnewGroupModalOpen(false);
      setIsBookmarkModalOpen(true);
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to create group";
      toast.error(message);
    },
  });

  const handleCreateGroup = () => {
    if (groupName.trim()) {
      createFolderMutation.mutate({ name: groupName.trim() });
    }
  };

  return (
    <Modal
      isOpen={isnewGroupModalOpen}
      onClose={() => setIsnewGroupModalOpen(false)}
      title="Create a new group"
      description="All vocabularies in one group, get an access quickly."
      primaryBtnText="Create a group"
      isPrimaryBtnDisabled={!groupName || createFolderMutation.isPending}
      onPrimaryBtnClick={handleCreateGroup}
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
