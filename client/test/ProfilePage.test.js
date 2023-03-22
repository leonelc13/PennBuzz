import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ProfilePage from "../src/components/ProfilePage/ProfilePage";

describe("ProfilePage", () => {
    test("displays the profile image and name", async () => {
      const profile = {
        profile_img: "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
        user: "johndoe",
        biography: "I am a software developer.",
      };
      const quizzes = [];
  
      render(<ProfilePage user="johndoe" profile={profile} quizzes={quizzes} />);
  
      const profileImage = await screen.findByAltText("profile pic");
      expect(profileImage).toBeInTheDocument();
  
      const profileName = await screen.findByText("johndoe");
      expect(profileName).toBeInTheDocument();
    });
  });