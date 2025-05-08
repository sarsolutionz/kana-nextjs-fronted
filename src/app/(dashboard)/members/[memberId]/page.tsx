"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Loader, MoveLeftIcon } from "lucide-react";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { ImageUpload } from "@/features/members/components/image-upload";
import { TestimonialSliderCard } from "../../../../components/testimonials-slider-card";

import { useMemberId } from "@/features/members/hooks/use-member-id";
import { useGetByIdVehicleDocQuery } from "@/redux/features/vehicle/vehicleApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { Testimonial } from "@/features/members/types";

interface VehicleDoc {
  id: string;
  description: string;
  image: string;
}

const MemberIdPage = () => {
  const memberId = useMemberId();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const file = new File(["content"], "sample.txt", { type: "text/plain" });

  const handleOpen = () => setIsDialogOpen(true);
  const handleClose = () => setIsDialogOpen(false);

  const { data, refetch, isLoading, error } = useGetByIdVehicleDocQuery(
    memberId ?? skipToken,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (memberId && error) {
      console.error("Error fetching data", error);
    }
  }, [memberId, error]);

  if (isLoading && !memberId) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center">
        <Loader className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const testimonials: Testimonial[] =
    data?.map((item: VehicleDoc) => {
      if (!item) return;
      return {
        id: item.id,
        name: item.description,
        imgSrc: `${process.env.NEXT_PUBLIC_SERVER_URI}${item.image}`,
      };
    }) ?? [];

  return (
    <main className="flex justify-center items-center min-h-screen flex-col space-y-4 py-24 px-5">
      {!!testimonials && (
        <div className="container">
          <TestimonialSliderCard
            testimonials={testimonials}
            refetch={refetch}
          />
        </div>
      )}
      <Button variant="outline" size="sm" className="absolute top-16 left-72">
        <Link href="/members" className="flex items-center space-x-2">
          <MoveLeftIcon className="size-5 text-muted-foreground" />{" "}
          <span>Back</span>
        </Link>
      </Button>
      <h1 className="text-5xl font-semibold">Driver Document Vault</h1>
      <p className="text-muted-foreground">
        Securely upload and manage all driver-related documents in one place.
      </p>
      <div className="flex gap-4">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              className="rounded-full shadow"
              variant="outline"
              onClick={handleOpen}
            >
              File upload
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle className="text-center">
                Upload your files
              </DialogTitle>
              <DialogDescription className="text-center">
                The only file upload you will ever need
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <ImageUpload
                id={memberId}
                progress={0}
                File={file}
                handleClose={handleClose}
                refetch={refetch}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

export default MemberIdPage;
