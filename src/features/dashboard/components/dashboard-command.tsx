import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

import {
    CommandList,
    CommandItem,
    CommandEmpty,
    CommandInput,
    CommandGroup,
    CommandSeparator,
    CommandResponsiveDialog,
} from "@/components/ui/command";

import { useGetAllVehicleInfoQuery } from "@/redux/features/vehicle/vehicleApi";
import { useGetAllProfilesInfoQuery } from "@/redux/features/team/teamApi";

import { TeamData } from "@/features/teams/types";
import { VehicleData } from "@/features/members/types";
import { useGetDriverInfoQuery } from "@/redux/features/partner/partnerApi";
import { Partner } from "@/features/partners/types";

interface Props {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
};

export const DashboardCommand = ({
    open,
    setOpen,
}: Props) => {
    const router = useRouter();
    const [search, setSearch] = useState("");

    const { data: drivers } = useGetAllVehicleInfoQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });
    const { data: teams } = useGetAllProfilesInfoQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const { data: partners } = useGetDriverInfoQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const filteredDrivers = drivers?.filter((driver: VehicleData) =>
        driver.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredTeams = teams?.filter((team: TeamData) =>
        team.name.toLowerCase().includes(search.toLowerCase())
    );

    const filteredPartners = partners?.drivers.filter((partner: Partner) =>
        partner.name.toLowerCase().includes(search.toLowerCase())
    );

    const noResults = filteredDrivers?.length === 0 && filteredTeams?.length === 0 && filteredPartners?.length === 0;

    return (
        <CommandResponsiveDialog shouldFilter={false} open={open} onOpenChange={setOpen}>
            <CommandInput
                placeholder="Find a driver or team..."
                value={search}
                onValueChange={(value) => setSearch(value)}
            />
            <CommandList>
                <CommandGroup heading="Drivers">
                    {noResults && (
                        <CommandEmpty>
                            <span className="text-muted-foreground text-sm">
                                No drivers found
                            </span>
                        </CommandEmpty>
                    )}
                    {filteredDrivers?.map((driver: VehicleData) => (
                        <CommandItem
                            onSelect={() => {
                                router.push(`/members/${driver.id}`)
                                setOpen(false);
                            }}
                            key={driver.id}
                        >
                            {driver.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Teams">
                    {noResults && (
                        <CommandEmpty>
                            <span className="text-muted-foreground text-sm">
                                No teams found
                            </span>
                        </CommandEmpty>
                    )}
                    {filteredTeams?.map((team: TeamData) => (
                        <CommandItem
                            onSelect={() => {
                                router.push(`/teams`)  // TODO: /${team.id}
                                setOpen(false);
                            }}
                            key={team.id}
                        >
                            {team.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Partners">
                    {noResults && (
                        <CommandEmpty>
                            <span className="text-muted-foreground text-sm">
                                No partners found
                            </span>
                        </CommandEmpty>
                    )}
                    {filteredPartners?.map((partner: Partner) => (
                        <CommandItem
                            onSelect={() => {
                                router.push(`/partners?partner-view=partner`)   // TODO: ${partner.id 
                                setOpen(false);
                            }}
                            key={partner.id}
                        >
                            {partner.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandResponsiveDialog>
    )
};
