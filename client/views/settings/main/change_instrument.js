Template.change_instrument.helpers({
    instrumentName: studentInstrument,
    instrumentList: function () {
        return Instrument.find( {"name": {$ne: studentInstrument()} } );
    }
});
