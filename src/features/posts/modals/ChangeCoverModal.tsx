import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useEffect, useState } from "react";

import { showErrorDialog } from "../../../helpers/toolsHelper";
import {
  asyncSetIsPostChangeCover,
  asyncSetPost,
  setIsPostChangeCoverActionCreator,
  setIsPostChangedCoverActionCreator,
} from "../states/action";
import { IconX, IconPhotoUp, IconLoader2, IconUpload } from "@tabler/icons-react";

function ChangeCoverModal({ show, onClose, post }) {
  const dispatch = useAppDispatch();

  const isPostChangeCover = useAppSelector((state) => state.isPostChangeCover);
  const isPostChangedCover = useAppSelector((state) => state.isPostChangedCover);

  const [loading, setLoading] = useState(false);
  const [fileCover, setFileCover] = useState(null as File | null);
  const [previewUrl, setPreviewUrl] = useState(null as string | null);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      setFileCover(null);
      setPreviewUrl(null);
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);

  useEffect(() => {
    if (isPostChangeCover) {
      dispatch(setIsPostChangeCoverActionCreator(false));
      setLoading(false);
      if (isPostChangedCover) {
        dispatch(setIsPostChangedCoverActionCreator(false));
        dispatch(asyncSetPost(post?.id));
        onClose();
      }
    }
  }, [isPostChangeCover, isPostChangedCover, dispatch, onClose, post]);

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!allowedTypes.includes(file.type)) {
        showErrorDialog("Hanya file JPEG, JPG, atau PNG yang diperbolehkan!");
        return;
      }
      const MAX_FILE_SIZE = 1024 * 1024; // 1MB sesuai batas server
      if (file.size > MAX_FILE_SIZE) {
        showErrorDialog("Ukuran file terlalu besar. Maksimal 1MB!");
        return;
      }
      setFileCover(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  function handleSave(e) {
    e.preventDefault();
    if (!fileCover) {
      showErrorDialog("Pilih file cover terlebih dahulu!");
      return;
    }

    setLoading(true);
    dispatch(asyncSetIsPostChangeCover(post.id, fileCover));
  }

  if (!show || !post) return null;

  return (
    <div
      data-testid="change-cover-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-mauve-900/50 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="change-cover-modal-title"
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-blush-100 overflow-hidden transform transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-blush-100 bg-mauve-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-lilac-100 text-lilac-700 flex items-center justify-center">
              <IconPhotoUp aria-hidden="true" size={18} stroke={2.5} />
            </div>
            <h2 id="change-cover-modal-title" className="text-base font-bold text-mauve-800">
              Ubah Cover Postingan
            </h2>
          </div>
          <button
            type="button"
            data-testid="close-cover-modal-btn"
            onClick={onClose}
            aria-label="Tutup"
            className="p-1.5 rounded-xl text-mauve-600 hover:text-mauve-800 hover:bg-mauve-100 transition-colors"
          >
            <IconX aria-hidden="true" size={18} />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div>
            <span className="block text-sm font-semibold text-mauve-700 mb-2">
              Pilih Gambar Cover
            </span>
            <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-mauve-300 hover:border-blush-500 rounded-3xl cursor-pointer bg-mauve-50/50 hover:bg-blush-50/20 transition-all overflow-hidden relative">
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  width={384}
                  height={176}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                  <div className="w-10 h-10 mb-2 rounded-full bg-blush-50 text-blush-600 flex items-center justify-center">
                    <IconUpload aria-hidden="true" size={20} />
                  </div>
                  <p className="text-sm font-semibold text-mauve-700">
                    Klik untuk memilih foto
                  </p>
                  <p className="text-xs text-mauve-600 mt-1">PNG, JPG, JPEG (Max. 1MB)</p>
                </div>
              )}
              <input
                type="file"
                data-testid="cover-file-input"
                accept=".jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-blush-100">
            <button
              type="button"
              data-testid="cancel-cover-modal-btn"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 text-sm font-medium text-mauve-600 hover:text-mauve-800 hover:bg-mauve-100 rounded-2xl transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              data-testid="submit-cover-modal-btn"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-lilac-700 hover:bg-lilac-800 active:bg-lilac-900 rounded-2xl shadow-md shadow-lilac-700/25 transition-all disabled:opacity-60"
            >
              {loading ? (
                <>
                  <IconLoader2 aria-hidden="true" size={18} className="animate-spin" />
                  <span>Mengunggah...</span>
                </>
              ) : (
                <>
                  <IconUpload aria-hidden="true" size={18} stroke={2.5} />
                  <span>Unggah Cover</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangeCoverModal;