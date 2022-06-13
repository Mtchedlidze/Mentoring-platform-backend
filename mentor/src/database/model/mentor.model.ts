import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { softDeletePlugin } from 'soft-delete-plugin-mongoose'

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
}

export const MentorSchema =
  SchemaFactory.createForClass(Mentor).plugin(softDeletePlugin)
