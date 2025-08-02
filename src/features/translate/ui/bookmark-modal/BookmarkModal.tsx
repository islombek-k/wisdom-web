import { PlusIcon, TickIcon } from "@/shared/assets/icons";
import { Modal } from "@/shared/ui";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { wordbankApi } from "@/features/wordbank/api/wordbankApi";

interface bookmarkModalProps {
  isBookmarkModalOpen: boolean;
  setIsBookmarkModalOpen: (value: boolean) => void;
  onPressNewModal: () => void;
  translation: {
    id: number;
    word: string;
    star: number;
    word_class: string;
    type: string;
  };
}

const   BookmarkModal = ({
  isBookmarkModalOpen,
  setIsBookmarkModalOpen,
  onPressNewModal,
  translation,
}: bookmarkModalProps) => {
  const [isSavedGroupIdIncluded, setIsSavedGroupIdIncluded] = useState<
    number[]
  >([]);

  const createWordbankMutation = useMutation({
    mutationFn: wordbankApi.create,
    onSuccess: () => {
      toast.success("Vocabulary saved");
    },
    onError: (error: any) => {
      const message =
        error.response?.data?.message || "Failed to save vocabulary";
      toast.error(message);
    },
  });

  console.log("wordBank", translation);

  const handleSaveVocabulary = (folderId: number) => {
    // setIsSavedGroupIdIncluded([...isSavedGroupIdIncluded, folderId]);

    createWordbankMutation.mutate({
      folder_id: folderId,
      word_id: translation.id,
      word_parent_id: translation.id,
      word: translation.word,
      translation: translation.word,
      number: 1,
      type: translation.type,
      word_class: translation.word_class,
    });
  };

  const { data: wordbankData } = useQuery({
    queryKey: ["wordbank"],
    queryFn: wordbankApi.getList,
    enabled: isBookmarkModalOpen,
  });

  const bookmarks = wordbankData?.folders || [];
  console.log(bookmarks);
  return (
    <Modal
      isOpen={isBookmarkModalOpen}
      onClose={() => setIsBookmarkModalOpen(false)}
      title="Save a vocabulary"
      description="Your vocabularies will be saved in your files."
    >
      <div className="flex flex-col gap-3">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="flex items-center justify-between p-6 bg-gray-100 hover:bg-primary-100 rounded-md"
          >
            <div className="leading-5">
              <p className="font-semibold text-base-black">{bookmark.name}</p>
              {/* <span className="text-gray-600 text-xs">{bookmark.id} words</span> */}
            </div>
            <button
              onClick={() => handleSaveVocabulary(bookmark.id)}
              disabled={createWordbankMutation.isPending}
            >
              {/* {isSavedGroupIdIncluded.includes(bookmark.id) ? (
                <TickIcon />
              ) : ( */}
              <PlusIcon />
              {/* // )} */}
            </button>
          </div>
        ))}
        <button
          className="flex items-center gap-2"
          onClick={() => {
            setIsBookmarkModalOpen(false);
            onPressNewModal();
          }}
        >
          <PlusIcon stroke="#026AA2" width={20} height={20} />
          <p className="text-primary-700 font-semibold text-sm">New group</p>
        </button>
      </div>
    </Modal>
  );
};

export default BookmarkModal;
