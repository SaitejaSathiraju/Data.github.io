import sys
import json
from pulp import LpMinimize, LpProblem, LpVariable, lpSum, PULP_CBC_CMD

def optimize(servers):
    power = list(map(int, servers['power'].split(',')))
    cooling = list(map(int, servers['cooling'].split(',')))
    workload = list(map(int, servers['workload'].split(',')))
    eta = 0.3
    L = sum(workload) // 2  # Arbitrary workload target

    # Define the LP problem
    model = LpProblem(name="Energy-Optimization", sense=LpMinimize)

    # Decision variables
    x = [LpVariable(f"x{i}", lowBound=0, upBound=1) for i in range(len(power))]

    # Objective function
    model += lpSum((power[i] + eta * cooling[i]) * x[i] for i in range(len(power)))

    # Constraints
    model += lpSum(workload[i] * x[i] for i in range(len(workload))) >= L

    # Solve the problem
    model.solve(PULP_CBC_CMD(msg=0))

    # Prepare the solution
    solution = [{"server": f"Server {i+1}", "status": "On" if x[i].value() > 0 else "Off"} for i in range(len(x))]
    total_energy = sum((power[i] + eta * cooling[i]) * x[i].value() for i in range(len(x)))

    return solution, total_energy

if __name__ == "__main__":
    power = sys.argv[1]
    cooling = sys.argv[2]
    workload = sys.argv[3]
    servers = {"power": power, "cooling": cooling, "workload": workload}
    
    solution, total_energy = optimize(servers)
    
    # Output the results in JSON format
    result = {"solution": solution, "totalEnergy": total_energy}
    print(json.dumps(result))
