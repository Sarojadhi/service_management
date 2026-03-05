import Container from "../components/container";
import Items from "../components/items";
import { IconName } from "lucide-react/dynamic";

const CargoManagement = () => {
  interface CargoManagement {
    name: string;
    description: string;
    icon: IconName;
    route: string;
  }

  const CargoManagement: CargoManagement[] = [
    {
      name: "Cargo Received",
      description: "Record incoming cargo details",
      icon: "package",
      route: "cargo-received",
    },
    {
      name: "Cargo Send",
      description: "Manage outgoing cargo dispatch",
      icon: "truck",
      route: "cargo-send",
    },
  ];

  return (
    <Container>
      <Items clients={CargoManagement} cols={2} />
    </Container>
  );
};

export default CargoManagement;