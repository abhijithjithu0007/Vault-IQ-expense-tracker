import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useExpenseStore } from "@/store/expenseStore";
import { useQuery } from "@tanstack/react-query";

export function DeleteExpense({ expenseId }: { expenseId: number }) {
  const deleteUserExpense = useExpenseStore((state) => state.deleteExpense);
  const { refetch } = useQuery({
    queryKey: ["expenses"],
  });
  const handleDeleteUserExpense = async () => {
    const { message, type } = await deleteUserExpense(expenseId);
    alert(message);
    refetch();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <p className="text-red-500">Delete</p>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure want to delete?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteUserExpense}
            className="bg-red-500"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
