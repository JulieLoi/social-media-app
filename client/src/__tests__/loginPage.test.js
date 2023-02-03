import {render, screen} from "@testing-library/react";
import LoginPage from "scenes/loginPage";

it('have elements', () => {
    render(<LoginPage />)

    const textLogo = screen.getByLabelText('Sociopedia');

    expect(textLogo).toBeInTheDocument();

})

/*

It seems the CustomerListTable component you are testing in isolation doesn't have access to
 a routing context it's expecting as when it's rendered in the app normally. 
 
 It's completely normal to need to wrap components when testing them with providers 
 (redux, themes/styling, localization, routing, etc...) that are providing specific 
 React Context values the component is accessing, typically via React hooks.

*/
