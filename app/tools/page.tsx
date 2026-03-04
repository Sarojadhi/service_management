import Container from "../components/container";
import Items from "../components/items";
import { IconName } from "lucide-react/dynamic";

const Tools = () => {
  interface Tool {
    name: string;
    description: string;
    icon: IconName;
    route: string;
  }

  const tools: Tool[] = [
    {
      name: "Installation Tools",
      description: "Manage installation tool records",
      icon: "wrench",
      route: "installationtools",
    },
    {
      name: "Calibration Tools",
      description: "Track calibration tools and usage",
      icon: "ruler",
      route: "calibrationtools",
    },
  ];

  return (
    <Container>
      <Items clients={tools} cols={2} />
    </Container>
  );
};

export default Tools;