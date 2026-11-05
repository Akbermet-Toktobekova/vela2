import React, { useState } from "react";
import { Keyboard, Platform, Text, TouchableOpacity, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Field, glass, colors } from "./SoftGlass";

export function DateField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected =
    /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value))
      ? new Date(value + "T12:00:00")
      : new Date();
  if (Platform.OS === "web")
    return (
      <Field
        label={label + " (YYYY-MM-DD)"}
        value={value}
        onChange={onChange}
      />
    );
  return (
    <View style={{ gap: 7 }}>
      <Text style={glass.label}>{label}</Text>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityLabel={label}
        onPress={() => { Keyboard.dismiss(); setOpen(true); }}
        style={glass.input}
      >
        <Text style={{ fontSize: 15, color: colors.ink }}>
          {value ? selected.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" }) : "Choose a date"}
        </Text>
      </TouchableOpacity>
      {open && (
        <DateTimePicker
          value={selected}
          mode="date"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={(event, date) => {
            if (Platform.OS !== "ios") setOpen(false);
            if (event.type === "set" && date) {
              const localDate = [
                date.getFullYear(),
                String(date.getMonth() + 1).padStart(2, "0"),
                String(date.getDate()).padStart(2, "0"),
              ].join("-");
              onChange(localDate);
            }
          }}
        />
      )}
      {open && Platform.OS === "ios" && (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => setOpen(false)}
        >
          <Text style={{ color: colors.green, padding: 8 }}>Done</Text>
        </TouchableOpacity>
      )}
      {value && (
        <TouchableOpacity
          accessibilityRole="button"
          onPress={() => onChange("")}
        >
          <Text style={{ color: colors.muted, fontSize: 11 }}>Clear date</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
