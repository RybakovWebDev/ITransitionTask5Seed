import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { Controls } from "./components/Controls";
import { faker } from "@faker-js/faker";
import { FakeEntry } from "./components/FakeEntry";
import { useState } from "react";
import { ExportCSV } from "./components/ExportCSV";
class fakeEntry {
  constructor(id, fullName, address, phone) {
    this.id = id;
    this.fullName = fullName;
    this.address = address;
    this.phone = phone;
  }
}

function App() {
  const [errorCount, setErrorCount] = useState(0);
  const [region, setRegion] = useState("USA");
  const [seed, setSeed] = useState(0);
  const [pages, setPages] = useState(1);

  const regions = ["USA", "Germany", "Norway", "Russia"];
  let finalEntries = [];
  faker.seed(Number(seed));

  const newFakeEntry = () => {
    const entry = () => {
      const city = faker.datatype.number({ max: 10 });

      return new fakeEntry(
        faker.datatype.uuid(),
        faker.name.fullName(),
        `${city >= 7 ? `${faker.address.cityName()},` : ""}  ${faker.address.streetAddress(faker.datatype.boolean())}`,
        faker.phone.number()
      );
    };

    if (region === "USA") {
      faker.setLocale("en_US");
    }

    if (region === "Germany") {
      faker.setLocale("de");
    }

    if (region === "Norway") {
      faker.setLocale("nb_NO");
    }

    if (region === "Russia") {
      faker.setLocale("ru");
    }
    return entry();
  };

  const createFakeEntries = (entriesCount = 21) => {
    return Array.from({ length: entriesCount }, newFakeEntry);
  };

  const scrambleString = (str, type) => {
    const iterations = [str];

    const removeCharacter = () => {
      const lastIteration = iterations[iterations.length - 1];
      const charToChange = faker.datatype.number({ max: iterations[iterations.length - 1].length });

      const updatedString = lastIteration.substring(0, charToChange - 1) + lastIteration.substring(charToChange);
      iterations.push(updatedString);
    };

    const addCharacter = () => {
      const lastIteration = iterations[iterations.length - 1];
      const whereToAdd = faker.datatype.number({ max: str.length });

      const randomName = faker.name.fullName();

      const randomStreet = faker.address.street();

      const randomCharacter = (s) => faker.datatype.number({ max: s.length - 3 });
      let charToAdd;

      if (type === "id") charToAdd = faker.random.alpha(1);
      if (type === "name") charToAdd = randomName[randomCharacter(randomName)];
      if (type === "address") charToAdd = randomStreet[randomCharacter(randomStreet)];
      if (type === "num") charToAdd = faker.datatype.number({ min: 0, max: 9 });

      const updatedString = lastIteration.substring(0, whereToAdd) + charToAdd + lastIteration.substring(whereToAdd);
      iterations.push(updatedString);
    };

    const swapCharacter = () => {
      const lastIteration = iterations[iterations.length - 1];
      const charToSwap = faker.datatype.number({ max: str.length });
      const updatedString =
        lastIteration.substring(0, charToSwap - 1) +
        lastIteration.substring(charToSwap, charToSwap + 1) +
        lastIteration.substring(charToSwap, charToSwap - 1) +
        lastIteration.substring(charToSwap + 1);
      iterations.push(updatedString);
    };

    const operation = faker.datatype.number({ max: 2 });

    if (operation === 0) removeCharacter();
    if (operation === 1) addCharacter();
    if (operation === 2) swapCharacter();

    return iterations[iterations.length - 1];
  };

  const addErrors = (input) => {
    const postError = input.slice(1).map((el) => {
      const iterID = [el.id];
      const iterName = [el.fullName];
      const iterAddress = [el.address];
      const iterPhone = [el.phone];

      let float = false;
      let errors;

      if (Number.isInteger(errorCount)) {
        float = false;
        errors = errorCount;
      }
      if (!Number.isInteger(errorCount)) {
        float = true;
        errors = errorCount + 0.5;
      }

      const inroduceErrors = (count) => {
        for (let i = 0; i < count; i++) {
          const lastIterationID = iterID[iterID.length - 1];
          const lastIterationName = iterName[iterName.length - 1];
          const lastIterationAddress = iterAddress[iterAddress.length - 1];
          const lastIterationPhone = iterPhone[iterPhone.length - 1];
          const fieldToChange = faker.datatype.number({ max: 3 });

          if (fieldToChange === 0) iterID.push(scrambleString(lastIterationID, "id").substring(0, 40));
          if (fieldToChange === 1) iterName.push(scrambleString(lastIterationName, "name").substring(0, 40));
          if (fieldToChange === 2) iterAddress.push(scrambleString(lastIterationAddress, "address").substring(0, 40));
          if (fieldToChange === 3) iterPhone.push(scrambleString(lastIterationPhone, "num").substring(0, 40));
        }
      };

      if (float) {
        const rndm = faker.datatype.boolean();
        rndm ? inroduceErrors(errors) : inroduceErrors(errors - 1);
      }
      if (!float) inroduceErrors(errors);

      el.id = iterID[iterID.length - 1];
      el.fullName = iterName[iterName.length - 1];
      el.address = iterAddress[iterAddress.length - 1];
      el.phone = iterPhone[iterPhone.length - 1];

      return el;
    });

    return postError;
  };

  const renderEntries = () => {
    for (let i = 0; i < pages; i++) {
      finalEntries.push(...createFakeEntries());
    }

    return addErrors(finalEntries);
  };

  const regionHandler = (e) => {
    setRegion(e.currentTarget.value);
  };

  const errorNumberHandler = (e) => {
    setErrorCount(Number(e.currentTarget.value));
  };

  const errorSliderHandler = (e) => {
    setErrorCount(Number(e.currentTarget.value));
  };

  const seedHandler = (e) => {
    if (e.currentTarget.id === "seed-number") setSeed(e.currentTarget.value);
    if (e.currentTarget.id === "seed-generate") setSeed(faker.datatype.number({ max: 30000 }));
    if (seed > 30000) setSeed(30000);
  };

  const scrollHandler = (e) => {
    if (e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight / 0.5) setPages(pages + 1);
  };

  return (
    <section className='app-parent'>
      <div className='app-body-cont'>
        <Controls
          uuidv4={uuidv4}
          errorCount={errorCount}
          regions={regions}
          region={region}
          regionHandler={regionHandler}
          errorNumberHandler={errorNumberHandler}
          errorSliderHandler={errorSliderHandler}
          seed={seed}
          seedHandler={seedHandler}
        />
        <FakeEntry uuidv4={uuidv4} fakeEntries={renderEntries()} region={region} scrollHandler={scrollHandler} />
        <ExportCSV finalEntries={finalEntries} />;
      </div>
    </section>
  );
}

export default App;
