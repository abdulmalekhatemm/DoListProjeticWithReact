import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

// Icons
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";

import { useTodosDispatch } from "../context/todosContexts";
import { useToast } from "../context/ToastContext";

export default function Todo({ todo, showDeleted, showUpdate }) {
  const dispatch = useTodosDispatch();
  const { showHideToast } = useToast();

  const handleCheckClick = () => {
    dispatch({ type: "toggledCompleted", payload: { id: todo.id } });
    if (!todo.isCompleted) {
      showHideToast("تم إنجاز المهمة بنجاح!");
    }
  };

  return (
    <Card
      elevation={2}
      sx={{
        mb: 2,
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
        },
        background: todo.isCompleted ? "#f1f8e9" : "#fff",
        borderLeft: `5px solid ${todo.isCompleted ? "#4caf50" : "#1976d2"}`,
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: 2,
          }}
        >
          {/* Todo Text Content (Far Right in RTL) */}
          <Box sx={{ flexGrow: 1, textAlign: "right", minWidth: 0 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                textDecoration: todo.isCompleted ? "line-through" : "none",
                color: todo.isCompleted ? "text.secondary" : "text.primary",
                wordBreak: "break-word",
              }}
            >
              {todo.title}
            </Typography>
            {todo.description && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.5 }}
              >
                {todo.description}
              </Typography>
            )}
          </Box>

          {/* Action Buttons (Far Left in RTL) */}
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexShrink: 0,
            }}
          >
            {/* Delete Button */}
            <Tooltip title="حذف">
              <IconButton
                onClick={() => showDeleted(todo)}
                sx={{
                  color: "#f44336",
                  border: "1.5px solid #f44336",
                  "&:hover": {
                    background: "rgba(244, 67, 54, 0.08)",
                  },
                }}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>

            {/* Edit Button */}
            <Tooltip title="تعديل">
              <IconButton
                onClick={() => showUpdate(todo)}
                sx={{
                  color: "#03a9f4",
                  border: "1.5px solid #03a9f4",
                  "&:hover": {
                    background: "rgba(3, 169, 244, 0.08)",
                  },
                }}
              >
                <ModeEditOutlinedIcon />
              </IconButton>
            </Tooltip>

            {/* Toggle Complete */}
            <Tooltip title={todo.isCompleted ? "غير مكتملة" : "تم الإنجاز"}>
              <IconButton
                onClick={handleCheckClick}
                sx={{
                  background: todo.isCompleted ? "#4caf50" : "transparent",
                  color: todo.isCompleted ? "#fff" : "#4caf50",
                  border: "1.5px solid #4caf50",
                  "&:hover": {
                    background: todo.isCompleted ? "#388e3c" : "rgba(76, 175, 80, 0.08)",
                  },
                }}
              >
                <CheckIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}