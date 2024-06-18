let unlocked = false;
let crest = false;
let fire = 0;
let feedText = ["<br>You fed the embers some carbonized... stuff you scraped out of a pan. They flicker happily in response.<br>",
    "<br>You tossed some slimy potato peels from a bucket to the embers. They blink out, then reluctantly engulf them with a dim glow.<br>",
    "<br>You give the embers some dry bread of undeterminable age. They gobble it up in a flash.<br>"];
let lamp = false;
let lampLit = false;

class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation);
    }
}

class Location extends Scene {
    create(key) {
        console.log(key);
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);

        if (locationData.Choices) {
            for (let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
                console.log(choice.Target);
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if (choice) {
            this.engine.show("&gt;<b> " + choice.Text + "</b>");
            if (choice.Target == "Portal") {
                this.engine.gotoScene(Portal, choice.Target);
            }
            else if (choice.Target == "Kitchen") {
                this.engine.gotoScene(Kitchen, choice.Target);
            }
            else if (choice.Target == "Treasury") {
                this.engine.gotoScene(Treasury, choice.Target);
            }
            else if (choice.Target == "Storage") {
                this.engine.gotoScene(Storage, choice.Target);
            }
            else {
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class Portal extends Location {
    create(key) {
        console.log(key);
        let locationData = this.engine.storyData.Locations[key];
        if (unlocked) {
            this.engine.show("<br>The portal flickers to life. The warmth of magic washes over your face.<br><br>");
        }
        else {
            this.engine.show("<br>The portal remains still. The inscription on the arc of the entrance reads 'For those whose blood will lead us in this world and the next'.<br><br>A slot for a round, palm sized object sits below the inscription.<br><br>")
        }


        if (locationData.Choices) {
            for (let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
                console.log(choice.Target);
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                if (unlocked) {
                    this.engine.addChoice("Go through the portal");
                }
                else {
                    if (crest && !unlocked) {
                        this.engine.addChoice("Put the crest in the slot", { "Text": "Put the crest in the slot", "Target": "Portal" });
                    }
                }
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }
    handleChoice(choice) {
        if (choice) {
            this.engine.show("&gt;<b> " + choice.Text + "</b>");
            if (choice.Target == "Portal") {
                unlocked = true;
                this.engine.gotoScene(Portal, choice.Target);
            }
            else {
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
};

class Kitchen extends Location {
    create(key) {
        console.log(key);
        let locationData = this.engine.storyData.Locations[key];
        if (lampLit) {
            this.engine.show("<br>The torch in your hand sparks excitedly, as if greeting the thriving fire in the pit.<br>")
        }
        if (fire > 0 && fire < 3) {
            this.engine.show(feedText[Math.floor(Math.random() * 3)]);
        }
        else if (fire >= 3 && !lampLit) {
            this.engine.show("<br>A full fire flickers and crackles happily in the pit.<br>")
        }
        this.engine.show(locationData.Body);
        if (fire <= 0) {
            this.engine.show("Mysteriously, living embers still seem to burn in it.<br><br>")
        }

        if (locationData.Choices) {
            for (let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
                console.log(choice.Target);
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
                if (fire < 3) {
                    this.engine.addChoice("Feed the embers stuff from the kitchen", { "Text": "Feed the embers stuff from the kitchen", "Target": "Fire" });
                }
                if (fire >= 3 && lamp && !lampLit) {
                    this.engine.addChoice("Light your torch", { "Text": "Light your torch", "Target": "Kitchen" })
                }
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }
    handleChoice(choice) {
        if (choice) {
            this.engine.show("&gt;<b> " + choice.Text + "</b>");
            if (choice.Target == "Fire") {
                ++fire;
                this.engine.gotoScene(Kitchen, "Kitchen");
            }
            else if (choice.Target == "Kitchen") {
                lampLit = true;
                this.engine.gotoScene(Kitchen, "Kitchen");
            }
            else {
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class Treasury extends Scene {
    create(key) {
        console.log(key);
        let locationData = this.engine.storyData.Locations[key];
        if (lampLit) {
            this.engine.show(locationData.Body);
            if (!crest) {
                this.engine.show("A palm-sized medallion, engraved with what seems to be some sort of royal crest sits on the table. Text encircling the border reads 'in this world and the next'.<br><br>");
            }
            else {
                this.engine.show("A strangely dustless circle remains on the table where the crest was.<br><br>");
            }
        }
        else {
            this.engine.show("<br>There's not much, if any natural light in this room. You can't make anything out.<br><br>");
        }

        if (locationData.Choices) {
            for (let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
                if (!crest && lampLit) {
                    this.engine.addChoice("Pick up the crest", { "Text": "Pick up the crest", "Target": "Treasury" });
                }
                console.log(choice.Target);
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if (choice) {
            this.engine.show("&gt;<b> " + choice.Text + "</b>");
            if (choice.Target == "Treasury") {
                crest = true;
                this.engine.gotoScene(Treasury, choice.Target);
            }
            else {
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class Storage extends Scene {
    create(key) {
        console.log(key);
        let locationData = this.engine.storyData.Locations[key];
        this.engine.show(locationData.Body);
        if (!lamp) {
            this.engine.show("A lengthy stick, with pitch caked onto one end, sits on a shelf to your right. It could serve as a torch, if you had something to light the end.<br><br>")
        }

        if (locationData.Choices) {
            for (let choice of locationData.Choices) {
                this.engine.addChoice(choice.Text, choice);
                if (!lamp) {
                    this.engine.addChoice("Pick up the unlit torch", {"Text":"Pick up the unlit torch", "Target":"Storage"});
                }
                console.log(choice.Target);
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if (choice) {
            this.engine.show("&gt;<b> " + choice.Text + "</b>");
            if (choice.Target == "Storage") {
                lamp = true;
                this.engine.gotoScene(Storage, choice.Target);
            }
            else {
                this.engine.gotoScene(Location, choice.Target);
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');