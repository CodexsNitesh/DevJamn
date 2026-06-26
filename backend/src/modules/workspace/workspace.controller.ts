import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import * as workspaceService from "./workspace.service"

export const createWorkspaceController = async(
    req: AuthRequest,
    res: Response,
)=>{
    try{
        const {name, description} = req.body;

        if(!name){
            return res.status(400).json({
                success: false,
                message: "Workspace name required"
            });
        }

        const workspace = await workspaceService.createWorkspace(
            req.user!.userId,
            name,
            description
        );

        res.status(201).json({
            success: true,
            workspace,
        })

    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getMyWorkspacesController = async(
    req: AuthRequest,
    res: Response
)=> { 
    const workspaces = await workspaceService.getMyWorkspace(
        req.user!.userId
    );
    res.json({
        succes: true,
        workspaces
    })     
}

export const getWorkspaceByIdController =
  async (
    req: AuthRequest,
    res: Response
  ) => {
    try {
      const workspaceId  = req.params.workspaceId as string

      const workspace =
        await workspaceService.getWorkspaceById(
          req.user!.userId,
          workspaceId
        );

      res.status(200).json({
        success: true,
        workspace,
      });
    } catch (error: any) {
      res.status(403).json({
        success: false,
        message: error.message,
      });
    }
  };