import { PlusIcon, TickIcon } from "@/shared/assets/icons";
import { Modal } from "@/shared/ui";
import { useState } from "react";
import { toast } from "react-toastify";

interface bookmarkModalProps {
  isBookmarkModalOpen: boolean;
  setIsBookmarkModalOpen: (value: boolean) => void;
  onPressNewModal: () => void;
}

const bookmarks = [
  {
    id: 1,
    name: "All vocabularies",
    wordCount: 10,
  },
  {
    id: 2,
    name: "Work",
    wordCount: 5,
  },
  {
    id: 3,
    name: "Personal",
    wordCount: 3,
  },
];

const BookmarkModal = ({
  isBookmarkModalOpen,
  setIsBookmarkModalOpen,
  onPressNewModal,
}: bookmarkModalProps) => {
  const [isSavedGroupIdIncluded, setIsSavedGroupIdIncluded] = useState<
    number[]
  >([]);
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
              <span className="text-gray-600 text-xs">
                {bookmark.wordCount} words
              </span>
            </div>
            <button
              onClick={() => {
                setIsSavedGroupIdIncluded([
                  ...isSavedGroupIdIncluded,
                  bookmark.id,
                ]);
                toast.success("Vocabulary saved");
              }}
            >
              {isSavedGroupIdIncluded.includes(bookmark.id) ? (
                <TickIcon />
              ) : (
                <PlusIcon />
              )}
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
