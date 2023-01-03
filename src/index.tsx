import { createRoot } from "react-dom/client";
import MealPlansContainer from './containers/MealPlans';
import ModalContainer from './containers/Modal';
import Plans from './modules/Plans';
import Modals from './modules/Modals';
import "./styles.css";

const container = document.getElementById("root") as Element;
const root = createRoot(container);
root.render(
  <div>
    <h1>Zenfit Meal [v2]</h1>
    <MealPlansContainer.Provider>
      <ModalContainer.Provider>
        <Plans/>
        <Modals/>
      </ModalContainer.Provider>
    </MealPlansContainer.Provider>
  </div>
);
