from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional
from datetime import datetime

from app import schemas
from app.api import deps
from app.services import note_service
from app.models.user import User

router = APIRouter()

@router.get("/", response_model=List[schemas.Note])
def read_notes(
    *,
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_user),
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
):
    notes = note_service.get_notes_by_user_and_date(
        db, user_id=current_user.id, start_date=start_date, end_date=end_date
    )
    return notes

@router.post("/", response_model=schemas.Note)
def create_note(
    *,
    db: Session = Depends(deps.get_db),
    note_in: schemas.NoteCreate,
    current_user: User = Depends(deps.get_current_user),
):
    note = note_service.create_user_note(db, note_in, current_user.id)
    return note

@router.put("/{note_id}", response_model=schemas.Note)
def update_note(
    *,
    db: Session = Depends(deps.get_db),
    note_id: int,
    note_in: schemas.NoteUpdate,
    current_user: User = Depends(deps.get_current_user),
):
    note = note_service.get_note_by_id(db, note_id)
    if not note or note.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Note not found")
    updated_note = note_service.update_user_note(db, note, note_in)
    return updated_note

@router.delete("/{note_id}", response_model=schemas.Note)
def delete_note(
    *,
    db: Session = Depends(deps.get_db),
    note_id: int,
    current_user: User = Depends(deps.get_current_user),
):
    note = note_service.get_note_by_id(db, note_id)
    if not note or note.user_id != current_user.id:
        raise HTTPException(status_code=404, detail="Note not found")
    note_service.delete_user_note(db, note)
    return note