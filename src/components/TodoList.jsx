import React, { useState, useEffect, useMemo } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";

import Todo from "./Todo";
import { useTodos, useTodosDispatch } from "../context/todosContexts";
import { useToast } from "../context/ToastContext";

export default function TodoList() {
  const todos = useTodos();
  const dispatch = useTodosDispatch();
  const { showHideToast } = useToast();

  const [inputValue, setInputValue] = useState("");
  const [displayType, setDisplayType] = useState("all");

  // Dialog States
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    dispatch({ type: "get" });
  }, [dispatch]);

  const filteredTodos = useMemo(() => {
    if (displayType === "completed") return todos.filter((t) => t.isCompleted);
    if (displayType === "non-completed") return todos.filter((t) => !t.isCompleted);
    return todos;
  }, [todos, displayType]);

  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    dispatch({ type: "added", payload: { newTitle: inputValue } });
    setInputValue("");
    showHideToast("تم إضافة المهمة بنجاح");
  };

  const handleOpenEdit = (todo) => {
    setSelectedTodo(todo);
    setOpenEditDialog(true);
  };

  const handleCloseEdit = () => {
    setOpenEditDialog(false);
    setSelectedTodo(null);
  };

  const handleConfirmEdit = () => {
    dispatch({
      type: "update",
      payload: {
        id: selectedTodo.id,
        title: selectedTodo.title,
        description: selectedTodo.description,
      },
    });
    handleCloseEdit();
    showHideToast("تم تحديث المهمة بنجاح");
  };

  const handleOpenDelete = (todo) => {
    setSelectedTodo(todo);
    setOpenDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setOpenDeleteDialog(false);
    setSelectedTodo(null);
  };

  const handleConfirmDelete = () => {
    dispatch({ type: "deleted", payload: { id: selectedTodo.id } });
    handleCloseDelete();
    showHideToast("تم حذف المهمة بنجاح");
  };

  return (
    <Container maxWidth="sm">
      <Card
        sx={{
          mt: 4,
          mb: 4,
          borderRadius: 4,
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          overflow: "visible",
        }}
      >
        <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <Typography variant="h3" fontWeight="bold" color="primary" gutterBottom>
              مهامي
            </Typography>
            <Divider variant="middle" />
          </Box>

          {/* Filter Section */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
            <ToggleButtonGroup
              value={displayType}
              exclusive
              onChange={(e, val) => val && setDisplayType(val)}
              color="primary"
              size="small"
              sx={{
                "& .MuiToggleButton-root": {
                  px: { xs: 1, sm: 2 },
                  py: 1,
                  fontWeight: "medium",
                },
              }}
            >
              <ToggleButton value="all">الكل</ToggleButton>
              <ToggleButton value="completed">المنجزة</ToggleButton>
              <ToggleButton value="non-completed">غير المنجزة</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Todo Items List */}
          <Box sx={{ minHeight: "200px" }}>
            {filteredTodos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                showUpdate={handleOpenEdit}
                showDeleted={handleOpenDelete}
              />
            ))}
            {filteredTodos.length === 0 && (
              <Typography
                variant="body1"
                textAlign="center"
                color="text.secondary"
                sx={{ mt: 4, fontStyle: "italic" }}
              >
                لا توجد مهام حالياً
              </Typography>
            )}
          </Box>

          {/* Add Todo Input */}
          <Box sx={{ mt: 5 }}>
            <Grid container spacing={1} alignItems="stretch">
              <Grid item xs={12} sm={9}>
                <TextField
                  fullWidth
                  label="ماذا تحتاج أن تفعل؟"
                  variant="outlined"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAdd()}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleAdd}
                  disabled={!inputValue.trim()}
                  sx={{ height: "100%", py: { xs: 1.5, sm: 0 } }}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog
        open={openEditDialog}
        onClose={handleCloseEdit}
        fullWidth
        maxWidth="xs"
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="اسم المهمة"
            fullWidth
            variant="outlined"
            value={selectedTodo?.title || ""}
            onChange={(e) =>
              setSelectedTodo({ ...selectedTodo, title: e.target.value })
            }
            sx={{ mb: 2, mt: 1 }}
          />
          <TextField
            margin="dense"
            label="التفاصيل"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={selectedTodo?.description || ""}
            onChange={(e) =>
              setSelectedTodo({ ...selectedTodo, description: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseEdit} color="inherit">
            إلغاء
          </Button>
          <Button onClick={handleConfirmEdit} variant="contained" color="primary">
            تأكيد التعديل
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDelete}
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle sx={{ fontWeight: "bold" }}>حذف المهمة</DialogTitle>
        <DialogContent>
          <DialogContentText>
            هل أنت متأكد من رغبتك في حذف مهمة "<strong>{selectedTodo?.title}</strong>"؟
            هذا الإجراء لا يمكن التراجع عنه.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDelete} color="inherit">
            تراجع
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            نعم، احذف المهمة
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}