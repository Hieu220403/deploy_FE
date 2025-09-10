import { Close as CloseIcon } from "@mui/icons-material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Box,
  Button,
  IconButton,
  Rating,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "~/hooks/useAppDispatch";
import { useAppSelector } from "~/hooks/useAppSelector";
import {
  createReview,
  uploadMediaReview,
} from "~/redux/features/review/actions";
import { MediaType, type Media } from "~/types/common";
import LoginModal from "../modals/Login";

interface ReviewInputProps {
  restaurantId: string;
}

const ReviewInput = ({ restaurantId }: ReviewInputProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [rating, setRating] = useState<number | null>(0);
  const [content, setContent] = useState("");
  const [files, setFiles] = useState<Media[]>([]);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);

  const validateFileBeforeUpload = (
    file: File,
    currentFiles: Media[],
  ): boolean => {
    const images = currentFiles.filter((f) => f.mediaType === MediaType.Image);
    const videos = currentFiles.filter((f) => f.mediaType === MediaType.Video);
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    if (!isImage && !isVideo) {
      toast.error("Chỉ hỗ trợ tải ảnh hoặc video");
      return false;
    }
    if (file.size > 50 * 1024 * 1024) {
      toast.error("File vượt quá kích thước cho phép (50MB)");
      return false;
    }
    if (isImage) {
      if (images.length >= 4) {
        toast.error("Chỉ được chọn tối đa 4 ảnh");
        return false;
      }
      if (videos.length > 0) {
        toast.error("Không thể tải ảnh khi đã có video");
        return false;
      }
    }
    if (isVideo) {
      if (videos.length >= 1) {
        toast.error("Chỉ được chọn tối đa 1 video");
        return false;
      }
      if (images.length > 0) {
        toast.error("Không thể tải video khi đã có ảnh");
        return false;
      }
    }
    return true;
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    for (const file of selectedFiles) {
      const isValid = validateFileBeforeUpload(file, files);
      if (!isValid) continue;
      try {
        setLoadingFile(true);
        const response = await uploadMediaReview(restaurantId, file);
        if (response) {
          setFiles((prev) => [...prev, response]);
        }
      } catch (error) {
        console.log(error);
        toast.error("Upload file thất bại");
      } finally {
        setLoadingFile(false);
      }
      e.target.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!user?._id) return setLoginModalOpen(true);
    if (!rating || !content.trim()) return;
    if (!user?._id) return;
    dispatch(
      createReview({
        rating,
        content,
        media: files.length > 0 ? files : undefined,
        restaurant_id: restaurantId,
        user_id: user._id,
      }),
    );
    setRating(0);
    setContent("");
    setFiles([]);
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Viết đánh giá
      </Typography>

      {/* Rating */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Rating
          value={rating}
          onChange={(_, value) => setRating(value)}
          precision={0.5}
        />
        <Typography>({rating || 0}) sao</Typography>
      </Box>

      {/* Nội dung */}
      <TextField
        fullWidth
        multiline
        rows={3}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Chia sẻ trải nghiệm của bạn..."
        sx={{ mt: 2 }}
        inputProps={{ maxLength: 500 }}
      />
      <Typography
        variant="caption"
        color={content.length >= 500 ? "error" : "text.secondary"}
        sx={{ display: "block", textAlign: "right", mt: 0.5 }}
      >
        {content.length}/500 ký tự
      </Typography>

      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
        {files?.map((file, index) => {
          const isImage = file.mediaType === MediaType.Image;
          const isVideo = file.mediaType === MediaType.Video;
          if (isVideo && index > 0) return null;
          return (
            <Box
              key={index}
              sx={{
                mt: 3,
                position: "relative",
                width: 200,
                height: 100,
                border: "1px solid #ddd",
                borderRadius: 1,
              }}
            >
              {isImage ? (
                <img
                  src={file.url}
                  alt={`preview-${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <video
                  controls
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                >
                  <source src={file.url} type="video/mp4" />
                  Trình duyệt không hỗ trợ video.
                </video>
              )}

              <IconButton
                size="small"
                onClick={() => handleRemoveFile(index)}
                sx={{
                  position: "absolute",
                  top: -10,
                  right: -10,
                  backgroundColor: "white",
                  boxShadow: "0 0 4px rgba(0,0,0,0.3)",
                  "&:hover": { backgroundColor: "white" },
                }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          );
        })}
        {loadingFile && (
          <Box
            sx={{
              mt: 3,
              width: 100,
              height: 100,
              borderRadius: 1,
            }}
          >
            <Skeleton
              variant="rectangular"
              width="100%"
              height="100%"
              animation="wave"
            />
          </Box>
        )}
      </Box>

      {/* Submit */}
      <Box sx={{ mt: 2, display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <Button
          variant="outlined"
          component="label"
          startIcon={<UploadFileIcon />}
        >
          Thêm ảnh/ video
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!rating || !content.trim() || loadingFile}
        >
          Gửi đánh giá
        </Button>
      </Box>
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </Box>
  );
};

export default ReviewInput;
