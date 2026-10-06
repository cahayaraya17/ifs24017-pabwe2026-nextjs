import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";

import useInput from "../../../hooks/useInput";
import { showErrorDialog } from "../../../helpers/toolsHelper";
import {
  asyncSetIsPostAdd,
  asyncSetPosts,
  setIsPostAddActionCreator,
  setIsPostAddedActionCreator,
} from "../states/action";
import { IconX, IconPlus, IconLoader2 } from "@tabler/icons-react";

function AddModal({ show, onClose }) {
  const dispatch = useAppDispatch();

  const isPostAdd = useAppSelector((state) => state.isPostAdd);
  const isPostAdded = useAppSelector((state) => state.isPostAdded);

  const [loading, setLoading] = useState(false);
  const [description, changeDescription, setDescription] = useInput("");

  useEffect(() => {
    if (isPostAdd) {
      setLoading(false);
      dispatch(setIsPostAddActionCreator(false));
      if (isPostAdded) {
        dispatch(setIsPostAddedActionCreator(false));
        dispatch(asyncSetPosts());
        setDescription("");
        onClose();
      }
    }
  }, [isPostAdd, isPostAdded, dispatch, onClose, setDescription]);

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
    dispatch(asyncSetIsPostAdd(description.trim()));
  }

  if (!show) return null;

  return (
    <div
      data-testid="add-post-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mauve-900/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-post-modal-title"
        className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-blush-100 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-blush-100 bg-mauve-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blush-100 text-blush-700 flex items-center justify-center">
              <IconPlus aria-hidden="true" size={18} stroke={2.5} />
            </div>
            <h2 id="add-post-modal-title" className="text-base font-bold text-mauve-800">
              Tambah Postingan Baru
            </h2>
          </div>
          <button
            type="button"
            data-testid="close-add-modal-btn"
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
              htmlFor="add-post-description"
              className="block text-sm font-semibold text-mauve-700 mb-1.5"
            >
              Deskripsi <span className="text-red-700">*</span>
            </label>
            <textarea
              id="add-post-description"
              data-testid="add-post-description-input"
              value={description}
              onChange={changeDescription}
              rows={5}
              placeholder="Tuliskan isi postingan yang ingin kamu bagikan..."
              className="w-full px-3.5 py-2.5 rounded-2xl border border-mauve-200 bg-white text-mauve-800 placeholder-mauve-500 focus:outline-none focus:ring-2 focus:ring-blush-500/20 focus:border-blush-600 transition-all text-sm resize-none"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-blush-100">
            <button
              type="button"
              data-testid="cancel-add-modal-btn"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 text-sm font-medium text-mauve-600 hover:text-mauve-800 hover:bg-mauve-100 rounded-2xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              data-testid="submit-add-modal-btn"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blush-500 to-lilac-400 hover:from-blush-600 hover:to-lilac-500 active:scale-[0.98] rounded-2xl shadow-md shadow-blush-500/30 transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <IconLoader2 aria-hidden="true" size={18} className="animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <IconPlus aria-hidden="true" size={18} stroke={2.5} />
                  <span>Publikasikan</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddModal;