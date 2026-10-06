import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";

import { showErrorDialog } from "../../../helpers/toolsHelper";
import {
  asyncSetIsPostChange,
  asyncSetPost,
  asyncSetPosts,
  setIsPostChangeActionCreator,
  setIsPostChangedActionCreator,
} from "../states/action";
import { IconX, IconEdit, IconLoader2 } from "@tabler/icons-react";

function ChangeModal({ show, onClose, postId }) {
  const dispatch = useAppDispatch();

  const isPostChange = useAppSelector((state) => state.isPostChange);
  const isPostChanged = useAppSelector((state) => state.isPostChanged);
  const post = useAppSelector((state) => state.post);

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (postId && show) {
      dispatch(asyncSetPost(postId));
    }
  }, [postId, show, dispatch]);

  useEffect(() => {
    if (post && show) {
      setDescription(post.description || "");
    }
  }, [post, show]);

  useEffect(() => {
    if (isPostChange) {
      setLoading(false);
      dispatch(setIsPostChangeActionCreator(false));
      if (isPostChanged) {
        dispatch(setIsPostChangedActionCreator(false));
        dispatch(asyncSetPosts());
        onClose();
      }
    }
  }, [isPostChange, isPostChanged, dispatch, onClose]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  function handleSave(e) {
    e.preventDefault();
    if (!description.trim()) {
      showErrorDialog("Deskripsi tidak boleh kosong");
      return;
    }

    setLoading(true);
    dispatch(asyncSetIsPostChange(postId, description.trim()));
  }

  if (!show) return null;

  return (
    <div
      data-testid="edit-post-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mauve-900/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-post-modal-title"
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-blush-100 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-blush-100 bg-mauve-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <IconEdit aria-hidden="true" size={18} stroke={2.5} />
            </div>
            <h2 id="edit-post-modal-title" className="text-base font-bold text-mauve-800">
              Ubah Postingan
            </h2>
          </div>
          <button
            type="button"
            data-testid="close-edit-modal-btn"
            onClick={onClose}
            aria-label="Tutup"
            className="p-1.5 rounded-xl text-mauve-600 hover:text-mauve-800 hover:bg-mauve-100 transition-colors"
          >
            <IconX aria-hidden="true" size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="edit-post-description"
              className="block text-sm font-semibold text-mauve-700 mb-1.5"
            >
              Deskripsi Postingan <span className="text-red-700">*</span>
            </label>
            <textarea
              id="edit-post-description"
              data-testid="edit-post-description-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full px-3.5 py-2.5 rounded-2xl border border-mauve-200 bg-white text-mauve-800 focus:outline-none focus:ring-2 focus:ring-blush-500/20 focus:border-blush-600 transition-all text-sm resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-blush-100">
            <button
              type="button"
              data-testid="cancel-edit-modal-btn"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 text-sm font-medium text-mauve-600 hover:text-mauve-800 hover:bg-mauve-100 rounded-2xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              data-testid="submit-edit-modal-btn"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-amber-700 hover:bg-amber-800 active:bg-amber-900 rounded-2xl shadow-md shadow-amber-700/25 transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <IconLoader2 aria-hidden="true" size={18} className="animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <IconEdit aria-hidden="true" size={18} stroke={2.5} />
                  <span>Perbarui Postingan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangeModal;