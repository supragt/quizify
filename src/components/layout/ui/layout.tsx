import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/shared/ui/sidebar";
import { Separator } from "@/shared/ui/separator";
import { matchPath, Outlet, useLocation, useNavigate } from "react-router";
import { TopicGroup } from "@/components/layout/ui/topic-group";
import { ROUTE_LABELS, ROUTES } from "@/app/constants/router";
import { House } from "lucide-react";

function Layout() {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <Sidebar variant="floating">
        <SidebarHeader>
          <div className="flex gap-x-3 py-2">
            <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-800">
              <img src="/icon-512.png" alt="logo" className="size-6" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Quizify</span>
              <span className="truncate text-xs">Баллы за верные ответы</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="gap-0">
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={!!matchPath(ROUTES.home, pathname)}
                  className="cursor-pointer"
                  onClick={() => {
                    navigate(ROUTES.home);
                  }}
                >
                  <House />
                  <span className="font-medium">Главная</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <TopicGroup />
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="h-svh max-h-svh gap-y-4 p-2 pr-2">
        <header className="bg-sidebar sticky top-0 mr-1 flex h-14 shrink-0 items-center gap-2 rounded-md border px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 max-h-4" />
          <span className="text-foreground text-sm font-medium">
            {ROUTE_LABELS[pathname]}
          </span>
        </header>
        <div className="flex-1 overflow-y-auto pr-1">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export { Layout };
