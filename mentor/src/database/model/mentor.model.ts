import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { softDeletePlugin } from 'soft-delete-plugin-mongoose'
import { Role } from '../constants/enum'

export type MentorDocument = Mentor & Document

@Schema({ timestamps: true })
export class Mentor {
  @Prop({ type: String, required: true, unique: true })
  email: string

  @Prop({ type: String, required: true })
  full_name: string

  @Prop({ type: String, required: true })
  bio: string

  @Prop({ type: String, required: true })
  password: string

  @Prop({ type: String })
  salt: string

  @Prop({ type: String })
  photo_url?: string

  @Prop({ enum: Role, default: Role.MENTOR })
  role: Role
}

export const MentorSchema =
  SchemaFactory.createForClass(Mentor).plugin(softDeletePlugin)
