from google.adk.agents import Agent
import os
import requests
textInstruction = ''
script_dir = os.path.dirname(os.path.abspath(__file__))
instructionPath = os.path.join(script_dir,'instruction.txt')
with open(instructionPath , encoding='utf-8') as f:
    textInstruction = f.read()


def executeCommand(commands:str)-> dict:
    CLI_URL = 'http://localhost:3000/execute'
    response = requests.post(CLI_URL , data = commands)
    return{
        "result" : response
    }

root_agent = Agent(
    name = "ControlAgent",
    model = 'gemini-2.0-flash',
    description='An agent which can perform Linux Commands and then on the basis of it, it can analyze the output of the CLI and can give a verdict as per it',
    instruction = textInstruction,
    tools=[executeCommand],    
)