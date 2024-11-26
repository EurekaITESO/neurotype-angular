from sqlalchemy.orm import Session
from datetime import datetime
from typing import Optional

from app.models.note import Note
from app.schemas.note import NoteCreate, NoteUpdate

def get_note_by_id(db: Session, note_id: int):
    return db.query(Note).filter(Note.id == note_id).first()

def get_notes_by_user(db: Session, user_id: int):
    return db.query(Note).filter(Note.user_id == user_id).all()

def create_user_note(db: Session, note_in: NoteCreate, user_id: int):
    note = Note(**note_in.dict(), user_id=user_id)
    db.add(note)
    db.commit()
    db.refresh(note)
    return note

def update_user_note(db: Session, note: Note, note_in: NoteUpdate):
    for key, value in note_in.dict(exclude_unset=True).items():
        setattr(note, key, value)
    db.commit()
    db.refresh(note)
    return note

def delete_user_note(db: Session, note: Note):
    db.delete(note)
    db.commit()

def count_notes_by_user(db: Session, user_id: int) -> int:
    return db.query(Note).filter(Note.user_id == user_id).count()

def get_notes_by_user_and_date(
    db: Session,
    user_id: int,
    start_date: Optional[datetime],
    end_date: Optional[datetime],
):
    query = db.query(Note).filter(Note.user_id == user_id)
    if start_date:
        query = query.filter(Note.created_at >= start_date)
    if end_date:
        query = query.filter(Note.created_at <= end_date)
    return query.all()