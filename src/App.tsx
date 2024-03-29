import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
  const [account, setAccount] = useState(1000);
  const [installers, setInstallers] = useState(1);
  const [installersInput, setInstallersInput] = useState("");
  const [marketingInput, setMarketingInput] = useState("");
  const [marketingValue, setMarketingValue] = useState(0);
  const [message, setMessage] = useState("");
  const [payroll, setPayroll] = useState(0);
  const [salary, setSalary] = useState("");
  const [costToHire, setCostToHire] = useState(220);

  useEffect(() => {
    setCostToHire((prev) => installers * 15 + prev);
  }, [installers]);

  function randNum(min: number, max: number) {
    return Math.round(Math.random() * (max * min) + min);
  }

  function startPayPeriod() {
    if (Number(salary) > account) {
      alert("you cant afford that salary");
    } else {
      const value = Number(marketingInput);
      setMarketingValue((prev) => prev + value);
      setAccount((prev) => prev - value);
      setMarketingInput("");
      useMarketing(value);
      setMessage("Work Week In Progress.");
    }
  }
  function useMarketing(num: number) {
    if (num < 100) {
      alert("add money to campagin");
    } else {
      const intervalId = setInterval(() => {
        num -= 100;
        setMarketingValue((prev) => prev - 100);
        spendMarketing();
        if (num - 100 < 0) {
          clearInterval(intervalId);
          setMessage("Marketing Campaign: Ended.");
          setTimeout(() => {
            setMessage("");
          }, 1000);
        }
      }, 2000);
    }
  }

  function spendMarketing() {
    let odds = randNum(1, 2);
    let employeeEfficency = Math.round((installers * Number(salary)) / 1.5);
    let jobValue = Math.round(randNum(1, 4) * employeeEfficency);
    setPayroll((prev) => prev - Number(salary) * installers);
    if (odds % 2) {
      setAccount((prev) => prev + jobValue);
    }
  }

  function hireInstaller() {
    let hireCost = 250;
    let newHire = Number(installersInput);
    if (account < hireCost * newHire) {
      alert(
        `It costs $hireCost to hire each employee. You need $${
          hireCost * newHire - account
        } more!`
      );
    } else {
      setAccount((prev) => prev - newHire * hireCost);
      setInstallers((prev) => prev + newHire);
      setInstallersInput("");
    }
  }

  function payPayroll() {
    setAccount((prev) => prev + payroll);
    setPayroll(0);
  }

  const handleMarketingChange = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setMarketingInput(e.target.value);
    }
  };

  const handleSalaryChange = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSalary(e.target.value);
    }
  };

  const handleInstallerChange = (e: any) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setInstallersInput(e.target.value);
    }
  };

  return (
    <>
      <div className="container">
        <div className="card mb-2">
          <div className="row">
            <div className="col">
              <div className="bg-success text-white rounded-top mb-1">
                Finances
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="bg-dark text-white rounded mb-2">
                <h6>Account</h6>
                {`$${account}`}
              </div>
            </div>
            <div className="col">
              <div className="bg-dark text-white rounded">
                <h6>Payroll</h6>
                {`$${payroll}`}
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-10 offset-1">
              <div className="input-group input-group-sm m-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  Set Marketing $:
                </span>
                <input
                  type="text"
                  className="form-control"
                  value={marketingInput}
                  onChange={handleMarketingChange}
                />
              </div>
            </div>

            <div className="col-10 offset-1">
              <div className="input-group input-group-sm m-3">
                <span className="input-group-text" id="inputGroup-sizing-sm">
                  Set Salary $:
                </span>
                <input
                  type="text"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm"
                  onChange={handleSalaryChange}
                />
              </div>
            </div>
          </div>
          <div className="col mb-1">
            <button className="btn btn-success m-1" onClick={startPayPeriod}>
              Start Pay Period
            </button>
            {payroll < 0 ? (
              <button className="btn btn-danger m-1" onClick={payPayroll}>
                Pay Payroll
              </button>
            ) : null}
          </div>
          <p>Marketing Budget: {marketingValue}</p>
          <p>{message}</p>
        </div>
        <div className="card mb-2">
          <div className="row">
            <div className="col">
              <div className="bg-primary text-white rounded-top">HR</div>
            </div>
          </div>
          <div className="col">
            <div className="bg-dark text-white rounded mt-1">
              <h6>{installers < 2 ? "Installer" : "Installer"}</h6>
              {`${installers}`}
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <div className="row p-3">
                <div className="col-4 offset-1">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="QTY"
                    value={installersInput}
                    onChange={handleInstallerChange}
                  />
                </div>
                <div className="col-7">
                  <button className="btn btn-primary" onClick={hireInstaller}>
                    Hire
                  </button>
                </div>
                <p className="p-2">Cost to hire: {costToHire}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
