import { matchPath, useLocation, useNavigate } from "react-router";
import { Dumbbell, Microscope, Palette } from "lucide-react";
import { ROUTES } from "@/app/constants/router";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/ui/sidebar";

function TopicGroup() {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const items = [
    {
      title: "Наука",
      icon: Microscope,
      link: ROUTES.science,
    },
    {
      title: "Спорт",
      icon: Dumbbell,
      link: ROUTES.sport,
    },
    {
      title: "Искусство",
      icon: Palette,
      link: ROUTES.art,
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Викторины по темам</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={!!matchPath(item.link, pathname)}
                className="cursor-pointer"
                onClick={() => {
                  navigate(item.link);
                }}
              >
                {item.icon && <item.icon />}
                <span className="font-medium">{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

export { TopicGroup };
