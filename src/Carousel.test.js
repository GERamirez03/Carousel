import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

// smoke test
it("renders without crashing", function() {
  render(<Carousel/>);
});

// snapshot test
it("matches snapshot", function() {
  const { asFragment } = render(<Carousel/>);
  expect(asFragment()).toMatchSnapshot();
});

/** specialized testing */

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel/>);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // at this point, we are on the second image. test that left arrow brings us back to first image

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second or third
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();
});

it("hides the left arrow while on the first image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel/>);

  // expect the first image to show, but not the left arrow
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
});

it("hides the right arrow while on the last image", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel/>);

  // move forward to the last image in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the third image to show, but not the right arrow
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();
  expect(queryByTestId("right-arrow")).not.toBeInTheDocument();
})
