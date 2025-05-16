import { User } from "lucide-react";
import { useAppStore } from "@/app/store/app.store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/ui/form";
import { declension } from "@/app/lib/utils";

function HomePage() {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState<boolean>(false);

  const username = useAppStore((state) => state.username);

  const balance = useAppStore((state) => state.balance);

  const results = useAppStore((state) => state.results);

  const setBalance = useAppStore((state) => state.setBalance);

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const formSchema = z.object({
    balance: z.number().max(balance, { message: "Недостаточно баллов" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      balance: 0,
    },
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onSubmit = () => {
    if (
      form.getValues("balance") > balance ||
      form.getValues("balance") === 0
    ) {
      return;
    }

    setBalance(-form.getValues("balance"));
    setDialogOpen(false);
    setSuccessDialogOpen(true);
    form.reset();
  };

  return (
    <div className="bg-sidebar flex size-full flex-col gap-y-4 rounded-md border p-4">
      <div className="flex gap-x-4 rounded-md border p-2">
        <div className="flex size-16 items-center justify-center rounded-md bg-blue-500">
          <User />
        </div>
        <div className="flex flex-col gap-y-1">
          <span className="text-sm font-medium">{username}</span>
          <span className="text-sm font-medium">Баллы: {balance}</span>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">Вывести баллы</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Вывод баллов</DialogTitle>
                <DialogDescription>
                  Введите сумму, которую хотите вывести
                </DialogDescription>
              </DialogHeader>

              <Form {...form}>
                <form className="space-y-8">
                  <FormField
                    control={form.control}
                    name="balance"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            onChange={(event) =>
                              field.onChange(Number(event.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>

              <DialogFooter>
                <Button variant="destructive" onClick={handleCloseDialog}>
                  Отменить
                </Button>
                <Button onClick={onSubmit}>Вывести</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="overflow-hidden rounded-md border">
        {results.length === 0 && (
          <div className="flex size-full items-center justify-center p-4">
            <span className="text-sm">
              Нет результатов завершенных викторин
            </span>
          </div>
        )}

        {results.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Дата</TableHead>
                <TableHead>Потраченное время</TableHead>
                <TableHead>Верные ответы/Всего</TableHead>
                <TableHead className="text-right">Баллы</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result) => (
                <TableRow key={result.date}>
                  <TableCell className="font-medium">
                    {new Date(result.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{result.timeSpent}</TableCell>
                  <TableCell>{result.answers}</TableCell>
                  <TableCell className="text-right">{result.scores}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Итого баллов</TableCell>
                <TableCell className="text-right">
                  {results.reduce((acc, el) => {
                    return acc + el.scores;
                  }, 0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>

      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Вы успешно вывели баллы</DialogTitle>
            <DialogDescription>
              Вы вывели {form.getValues("balance")}{" "}
              {declension(form.getValues("balance"), [
                "балл",
                "балла",
                "баллов",
              ])}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default HomePage;
